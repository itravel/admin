package com.itravel.admin.services.rest;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.io.ByteSink;
import com.google.common.io.Files;

@Path("/images")
public class ImageResource {
	@Context
	UriInfo uriInfo;
	
	private ObjectMapper mapper = new ObjectMapper();
	
	@Path("/")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response create(FormDataMultiPart formDataMultiPart)
			throws IOException {
		List<FormDataBodyPart> bodyPartList = formDataMultiPart
				.getFields("images");
		ArrayNode imagesNode = mapper.createArrayNode();
		for(FormDataBodyPart part:bodyPartList){
			File _temp = File.createTempFile("tmp-", ".png");
			System.out.println(_temp.toString());
			ByteSink bs = Files.asByteSink(_temp);
			InputStream input = part.getEntityAs(InputStream.class);
			bs.writeFrom(input);
			imagesNode.add(_temp.getName());
			
		}
		return Response.ok().entity(imagesNode.toString()).build();
	}
	public Response createImage(){
		return null;
	}
}
