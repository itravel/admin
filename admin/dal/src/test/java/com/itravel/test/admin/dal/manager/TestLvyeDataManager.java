package com.itravel.test.admin.dal.manager;

import static org.junit.Assert.fail;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import com.google.common.io.CharSource;
import com.google.common.io.Files;
import com.itravel.admin.dal.entities.LvyeActivity;
import com.itravel.admin.dal.managers.LvyeDataManager;

public class TestLvyeDataManager {
	private ObjectMapper mapper = new ObjectMapper();
	private LvyeDataManager manager = new LvyeDataManager();
	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testSave() throws IOException {
		CharSource charsource = Files.asCharSource(new File("D:/downloads/out.json"), Charsets.UTF_8);
//		System.out.println(charsource.read());
		
		List<LvyeActivity> acts = mapper.readValue(charsource.read(), new TypeReference<List<LvyeActivity>>(){});
//		JsonNode ac1t = mapper.readTree(charsource.read());
//		System.out.println(acts);
		for(LvyeActivity act:acts){
			System.out.println(act);
			this.manager.save(act);
		}
//		Iterator i = ac1t.iterator();
//		for(String line :charsource.readLines()){
			
//		}
	}

	@Test
	public void testGetAll() {
		fail("Not yet implemented");
	}

}
