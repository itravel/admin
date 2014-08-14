package com.itravel.admin.services.rest;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.inject.Singleton;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.collect.FluentIterable;
import com.itravel.admin.dal.entities.LvyeActivity;
import com.itravel.admin.dal.managers.LvyeDataManager;
import com.itravel.server.dal.managers.ActivityManager;
import com.itravel.server.services.rest.params.ActivitiesFormParam;
@Singleton
@Path("/lvye_activity")
public class LvyeResource {
	private LvyeDataManager manager = new LvyeDataManager();
	private ActivityManager actManager = new ActivityManager();
	private ObjectMapper objectMapper = new ObjectMapper();
	@Context
	private UriInfo info;
	public LvyeResource() {
	}
	@Path("/")
	@GET
	@Produces(MediaType.APPLICATION_JSON+";charset=utf-8")
	public Response getAll(@QueryParam(value = "start") int start,@QueryParam(value = "num") int maxNum){
		
		List<LvyeActivity> activities = manager.getPart(start, maxNum);
		return Response.ok().entity(activities).build();
	}
	
	@Path("/unedit")
	@GET
	@Produces(MediaType.APPLICATION_JSON+";charset=utf-8")
	public Response getUnedit(@QueryParam(value = "start") int start,@QueryParam(value = "num") int maxNum){
		
		List<LvyeActivity> activities = manager.getValidUnEditPart(start, maxNum);
		activities = FluentIterable.from(activities).transform(new Function<LvyeActivity,LvyeActivity>(){

			@Override
			public LvyeActivity apply(LvyeActivity input) {
				// TODO Auto-generated method stub
				try {
					Date date = DateUtils.parseDate(input.getStartTime(), "yyyy年MM月dd日");
					input.setStartTime(DateFormatUtils.format(date, "yyyy-MM-dd"));
					date = DateUtils.parseDate(input.getEndTime(), "yyyy年MM月dd日");
					input.setEndTime(DateFormatUtils.format(date, "yyyy-MM-dd"));
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return input;
			}}).toList();
		return Response.ok().entity(activities).build();
	}
	
	@Path("/{id}")
	@PUT
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON+";charset=utf-8")
	public Response lockLvyeActivity(@PathParam("id") long lvyeId,@FormParam("editor") String editor,@FormParam("status") int editStatus){
			LvyeActivity activity = manager.get(lvyeId);
			if(activity.getEditStatus()==1&&editStatus==1){
				return Response.status(Status.CONFLICT).entity("正在编辑").build();
			}
			activity.setEditStatus(editStatus);
			activity.setEditor(editor);
			manager.save(activity);
			return Response.ok().entity(activity).build();
	}

}
