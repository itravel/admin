package com.itravel.admin.services.rest;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.common.base.Predicate;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.itravel.admin.dal.entities.DoubanActivity;
import com.itravel.admin.dal.entities.LvyeActivity;
import com.itravel.admin.dal.managers.DoubanDataManager;
@Path("/douban")

public class DoubanResource {
	/**
	 * 过滤出超时的编辑中的活动
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
	DoubanDataManager manager = new DoubanDataManager();
	private static Map<Long, Long> editings = Maps.newConcurrentMap();
	private static final FilterTimeOutDateEditing myFilter = new FilterTimeOutDateEditing();
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
//		Set<Long> filtered = Sets.newHashSet();
		List<DoubanActivity> activities = manager.getFilteredPageData(start,
				maxNum, editings.keySet());
		return Response.ok().entity(activities).build();
	}
	
	@Path("/{id}")
	@PUT
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Response update(@PathParam("id") long doubanId,
			@FormParam("editor") String editor,
			@FormParam("status") int editStatus) {
		if(editStatus == 1){
			if(editings.containsKey(doubanId)){
				return Response.status(Status.CONFLICT).entity("正在编辑").build();
			}
			else {
				DoubanActivity activity = manager.get(doubanId);
				if(activity.getEditStatus() == 0){
					editings.put(doubanId, System.currentTimeMillis());
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
			editings.remove(doubanId);
			DoubanActivity activity = manager.get(doubanId);
			return Response.ok().entity(activity).build();
			
		/*	editings.remove(lvyeId);
			LvyeActivity activity = manager.get(lvyeId);
			activity.setEditStatus(editStatus);
			activity.setEditor(editor);
			editings.put(lvyeId, System.currentTimeMillis());
			return Response.ok().entity(activity).build();*/
		}
		else if(editStatus == 4){//用户想保存编辑结果
			DoubanActivity activity = manager.get(doubanId);
			activity.setEditStatus(editStatus);
			activity.setEditor(editor);
			manager.save(activity);
			editings.remove(doubanId);
			return Response.ok().entity(activity).build();
		}
		
		
		return Response.serverError().entity("不支持状态值,状态值仅支持 0,1,4").build();
	}
}
