package com.itravel.admin.services.rest;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.google.common.collect.Lists;
import com.itravel.admin.services.rest.aos.ActivityEditingEntity;
import com.itravel.server.dal.entities.ActivityEntity;
import com.itravel.server.dal.entities.ActivityImageEntity;
import com.itravel.server.dal.managers.ActivityManager;
import com.itravel.server.services.json.serializers.ActivityDesrializer;

@Path("activities")
public class ActivityResource {
	private static ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true).registerModule(new SimpleModule().addDeserializer(ActivityEntity.class, new ActivityDesrializer())).configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	private static ActivityManager aManager = new ActivityManager();
	@PUT
	@Path("/{id}/editing")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response edit(@PathParam("id") long id,String jsonStr){
		try {
			ActivityEditingEntity entity = mapper.readValue(jsonStr,ActivityEditingEntity.class);
			return Response.ok().entity(entity).build();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return Response.serverError().entity(e.getMessage()).build();
			
		}
		
		
	}
	
	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("id") long id,String jsonStr){
		try {
			ActivityEntity entity = mapper.readValue(jsonStr,ActivityEntity.class);
			aManager.save(entity);
			return Response.ok().entity(entity).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(e.getMessage()).build();
			
		}
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response create(String jsonStr){
		try {
			ActivityEntity entity = mapper.readValue(jsonStr,ActivityEntity.class);
			List<ActivityImageEntity> dd = Lists.newArrayList();
//			for(ActivityImageEntity ds : entity.getImages()){
//				dd.add(ds);
//			}
//			entity.getImages().clear();
			aManager.save(entity);
//			entity.setImages(images);
			return Response.ok().entity(entity).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(e.getMessage()).build();
			
		}
	}
}
