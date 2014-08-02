package com.itravel.admin.services.rest;

import java.io.IOException;
import java.util.List;

import javax.inject.Singleton;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Function;
import com.google.common.base.Optional;
import com.itravel.admin.dal.entities.LvyeActivity;
import com.itravel.admin.dal.managers.LvyeDataManager;
import com.itravel.admin.services.rest.params.ActivityBeanParam;
import com.itravel.server.dal.entities.ActivityEntity;
import com.itravel.server.dal.managers.ActivityManager;
import com.itravel.server.services.rest.params.ActivitiesFormParam;
@Singleton
@Path("/lvye_activity")
public class LvyeResource {
	private LvyeDataManager manager = new LvyeDataManager();
	private ActivityManager actManager = new ActivityManager();
	private ObjectMapper objectMapper = new ObjectMapper();
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
		
		List<LvyeActivity> activities = manager.getUnEditPart(start, maxNum);
		return Response.ok().entity(activities).build();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON+";charset=utf-8")
	@Path("/{id}")
	public Response update(
			@PathParam(value="id") long lvyeId,
			@FormParam(value="editor") String editor,
			@BeanParam ActivitiesFormParam beanParams){
		int v = beanParams.validate();
		if(v<0){
			return Response.serverError().entity(v).build();
		}
		ActivityEntity activity = Optional.fromNullable(beanParams).transform(new Function<ActivitiesFormParam,ActivityEntity>(){

			@Override
			public ActivityEntity apply(ActivitiesFormParam input) {
				// TODO Auto-generated method stub
				ActivityEntity entity = new ActivityEntity();
				try {
					String json = objectMapper.writeValueAsString(input);
					entity = objectMapper.readValue(json, ActivityEntity.class);
				} catch ( IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return entity;
			}}).get();
		actManager.save(activity);
		LvyeActivity lvye = manager.get(lvyeId);
		lvye.setHasEdit(true);
		lvye.setEditor(editor);
		manager.save(lvye);
		return Response.ok().entity(activity).build();
	}
	
}
