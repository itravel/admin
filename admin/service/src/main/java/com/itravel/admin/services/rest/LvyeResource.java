package com.itravel.admin.services.rest;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.Maps;
import com.itravel.admin.dal.entities.LvyeActivity;
import com.itravel.admin.dal.managers.LvyeDataManager;
import com.itravel.server.dal.managers.ActivityManager;

@Singleton
@Path("/lvye_activity")
public class LvyeResource {
	/**
	 * 过滤出超时的编辑中的绿野活动
	 * 
	 * @author william.wangwm
	 *
	 */
	private static final class FilterTimeOutDateEditing implements
			Predicate<Long> {
		private static final long INTERVAL = 20 *60* 1000;

		@Override
		public boolean apply(Long input) {
			// TODO Auto-generated method stub
			if (System.currentTimeMillis() > (input + INTERVAL)) {
				return true;
			}
			return false;
		}

	}

	private LvyeDataManager manager = new LvyeDataManager();
	private ActivityManager actManager = new ActivityManager();
	private ObjectMapper objectMapper = new ObjectMapper();
	private static Map<Long, Long> editings = Maps.newConcurrentMap();
	private static final FilterTimeOutDateEditing myFilter = new FilterTimeOutDateEditing();
	@Context
	private UriInfo info;

	public LvyeResource() {

	}

	@Path("/")
	@GET
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Response getAll(@QueryParam(value = "start") int start,
			@QueryParam(value = "num") int maxNum) {

		List<LvyeActivity> activities = manager.getPart(start, maxNum);
		return Response.ok().entity(activities).build();
	}

	@Path("/unedit")
	@GET
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Response getUnedit(@QueryParam(value = "start") int start,
			@QueryParam(value = "num") int maxNum) {

		Set<Long> isEditing = Maps.filterValues(this.editings, myFilter)
				.keySet();
		for (long id : isEditing) {
			editings.remove(id);
		}
		List<LvyeActivity> activities = manager.getValidUnEditPart(start,
				maxNum, editings.keySet());
		activities = FluentIterable.from(activities)
				.transform(new Function<LvyeActivity, LvyeActivity>() {

					@Override
					public LvyeActivity apply(LvyeActivity input) {
						// TODO Auto-generated method stub
						try {
							Date date = DateUtils.parseDate(
									input.getStartTime(), "yyyy年MM月dd日");
							input.setStartTime(DateFormatUtils.format(date,
									"yyyy-MM-dd"));
							date = DateUtils.parseDate(input.getEndTime(),
									"yyyy年MM月dd日");
							input.setEndTime(DateFormatUtils.format(date,
									"yyyy-MM-dd"));
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						return input;
					}
				}).toList();
		return Response.ok().entity(activities).build();
	}

	@Path("/{id}")
	@PUT
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Response lockLvyeActivity(@PathParam("id") long lvyeId,
			@FormParam("editor") String editor,
			@FormParam("status") int editStatus) {
		if(editStatus == 1){
			if(editings.containsKey(lvyeId)){
				return Response.status(Status.CONFLICT).entity("正在编辑").build();
			}
			else {
				
				LvyeActivity activity = manager.get(lvyeId);
				if(activity.getEditStatus() == 0){
					editings.put(lvyeId, System.currentTimeMillis());
					activity.setEditStatus(editStatus);
					activity.setEditor(editor);
					return Response.ok().entity(activity).build();
				}
				else {
					return Response.status(Status.CONFLICT).entity("该活动已被编辑过").build(); 
				}
			}
		}
		else if(editStatus == 0){//用户想取消编辑
			editings.remove(lvyeId);
			LvyeActivity activity = manager.get(lvyeId);
			return Response.ok().entity(activity).build();
			
		/*	editings.remove(lvyeId);
			LvyeActivity activity = manager.get(lvyeId);
			activity.setEditStatus(editStatus);
			activity.setEditor(editor);
			editings.put(lvyeId, System.currentTimeMillis());
			return Response.ok().entity(activity).build();*/
		}
		else if(editStatus == 4){//用户想保存编辑结果
			LvyeActivity activity = manager.get(lvyeId);
			activity.setEditStatus(editStatus);
			activity.setEditor(editor);
			manager.save(activity);
			editings.remove(lvyeId);
			return Response.ok().entity(activity).build();
		}
		
		
		return Response.serverError().entity("不支持状态值,状态值仅支持 0,1,4").build();
	}

}
