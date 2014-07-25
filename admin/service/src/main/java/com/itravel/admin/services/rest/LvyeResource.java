package com.itravel.admin.services.rest;

import java.util.List;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.itravel.admin.dal.entities.LvyeActivity;
import com.itravel.admin.dal.managers.LvyeDataManager;
@Singleton
@Path("/lvye_activity")
public class LvyeResource {
	public LvyeResource() {
		// TODO Auto-generated constructor stub
	}
	private LvyeDataManager manager = new LvyeDataManager();
	@Path("/")
	@GET
	@Produces(MediaType.APPLICATION_JSON+";charset=utf-8")
	public Response getAll(@QueryParam(value = "start") int start,@QueryParam(value = "num") int maxNum){
		
		List<LvyeActivity> activities = manager.getPart(start, maxNum);
		return Response.ok().entity(activities).build();
	}
	
}
