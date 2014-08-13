package com.itravel.admin.services.rest;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Function;
import com.google.common.base.Optional;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.itravel.admin.dal.entities.LvyeActivity;
import com.itravel.admin.dal.managers.LvyeDataManager;
import com.itravel.server.dal.entities.ActivityEntity;
import com.itravel.server.dal.managers.ActivityManager;
import com.itravel.server.services.rest.params.ActivitiesFormParam;
import com.itravel.server.services.rest.params.ActivitiesFormParam.ValidationEnum;
@Singleton
@Path("/lvye_activity")
public class LvyeResource {
	private LvyeDataManager manager = new LvyeDataManager();
	private ActivityManager actManager = new ActivityManager();
	private ObjectMapper objectMapper = new ObjectMapper();
	private LoadingCache<Long,LvyeActivity> cache = null;
	private UUID uuid = UUID.randomUUID();
	@Context
	private UriInfo info;
	public LvyeResource() {
		this.cache = CacheBuilder.newBuilder().build(new CacheLoader<Long,LvyeActivity>(){
            @Override
            public LvyeActivity load(Long key) throws Exception {        
            	return manager.get(key);               
            }
            
        });   
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
	@Path("/edittask")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON+";charset=utf-8")
	public Response lockLvyeActivity(@FormParam("lvyeId") long lvyeId,@FormParam("editor") String editor){
			
			LvyeActivity activity = manager.get(lvyeId);
			if(activity.getEditStatus()!=0){
				return Response.status(Status.CONFLICT).entity("正在编辑").build();
			}
			activity.setEditStatus(1);
			activity.setEditor(editor);
			manager.save(activity);
			return Response.ok().entity("/lvye_activity/edittask/"+uuid.clockSequence()).build();
	}

	
	
	
	
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON+";charset=utf-8")
	@Path("/{id}")
	public Response update(
			@PathParam(value="id") long lvyeId,
			@FormParam(value="editor") String editor,
			@BeanParam ActivitiesFormParam beanParams){
//		ValidationEnum v = beanParams.validate();
//		if(v != ValidationEnum.SUCC){
//			return Response.serverError().entity(v.getMessage()).build();
//		}
//		ActivityEntity activity = Optional.fromNullable(beanParams).transform(new Function<ActivitiesFormParam,ActivityEntity>(){
//
//			@Override
//			public ActivityEntity apply(ActivitiesFormParam input) {
//				// TODO Auto-generated method stub
//				ActivityEntity entity = new ActivityEntity();
//				try {
//					String json = objectMapper.writeValueAsString(input);
//					entity = objectMapper.readValue(json, ActivityEntity.class);
//				} catch ( IOException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//				return entity;
//			}}).get();
//		activity.setContent("");
//		actManager.save(activity);
		LvyeActivity lvye = manager.get(lvyeId);
		lvye.setEditStatus(4);
		lvye.setEditor(editor);
		manager.save(lvye);
		return Response.ok().build();
	}
	private static class EditTask {
		private long lvyeId=0;
		private String editor = "";
	}
}
