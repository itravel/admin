package com.itravel.admin.dal.managers;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.itravel.admin.dal.entities.LvyeActivity;

public class LvyeDataManager {
	private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("admin-dal");
	
	public void save(LvyeActivity lvye){
		EntityManager manager = emf.createEntityManager();
		manager.getTransaction().begin();
		if(lvye.getId()>0){
			manager.find(LvyeActivity.class, lvye.getId());
			manager.merge(lvye);
			
		}
		else {
			manager.persist(lvye);
		}
		manager.getTransaction().commit();
		manager.close();
	}

	/**
	 * 获取全部数据
	 * @return
	 */
	public List<LvyeActivity> getAll() {
		// TODO Auto-generated method stub
		EntityManager manager = emf.createEntityManager();
		List<LvyeActivity> activities = manager.createQuery("select L from LvyeActivity L",LvyeActivity.class).getResultList();
		manager.close();
		return activities;
		
	}
	
	/**
	 * 获取部分数据
	 * @param offset
	 * @param limit
	 * @return
	 */
	public List<LvyeActivity> getPart(int offset,int limit){
		EntityManager manager = emf.createEntityManager();
		List<LvyeActivity> activities = manager.createQuery("select L from LvyeActivity L order by L.id",LvyeActivity.class).setFirstResult(offset).setMaxResults(limit).getResultList();
		manager.close();
		return activities;
	}
}
