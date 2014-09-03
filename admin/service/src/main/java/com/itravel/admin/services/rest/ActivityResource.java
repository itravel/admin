package com.itravel.admin.services.rest;

import java.io.IOException;

import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itravel.admin.services.rest.aos.ActivityEditingEntity;

@Path("activities")
public class ActivityResource {
	private static ObjectMapper mapper = new ObjectMapper();
	@PUT
	@Path("/{id}/editing")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("id") long id,String jsonStr){
		try {
			ActivityEditingEntity entity = mapper.readValue(jsonStr,ActivityEditingEntity.class);
			System.out.println(entity);
			return Response.ok().entity(entity).build();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return Response.serverError().entity(e.getMessage()).build();
			
		}
		
		
	}
}
