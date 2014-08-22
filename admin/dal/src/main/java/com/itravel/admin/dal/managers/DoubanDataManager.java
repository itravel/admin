package com.itravel.admin.dal.managers;

import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.google.common.base.Joiner;
import com.itravel.admin.dal.entities.DoubanActivity;

public class DoubanDataManager {
	private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("admin-dal");
	
	public List<DoubanActivity> getFilteredPageData(int offset,int limit,Set<Long> filteredIds){
		EntityManager manager = emf.createEntityManager();
		List<DoubanActivity> activities = manager.createNativeQuery("select * from douban_activity where  id not in (?editings) order by id", DoubanActivity.class).setParameter("editings", Joiner.on(",").join(filteredIds)).setFirstResult(offset).setMaxResults(limit).getResultList();
		manager.close();
		return activities;
		
	}

	public DoubanActivity get(long id) {
		EntityManager manager = emf.createEntityManager();
		DoubanActivity entity = manager.find(DoubanActivity.class, id);
		manager.close();
		return entity;
	}

	public void save(DoubanActivity douban){
		EntityManager manager = emf.createEntityManager();
		manager.getTransaction().begin();
		if(douban.getId()>0){
			manager.find(DoubanActivity.class, douban.getId());
			manager.merge(douban);
			
		}
		else {
			manager.persist(douban);
		}
		manager.getTransaction().commit();
		manager.close();
	}

}
