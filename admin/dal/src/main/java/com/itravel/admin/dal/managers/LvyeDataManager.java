package com.itravel.admin.dal.managers;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.google.common.base.Joiner;
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
	
	/**
	 * 获取部分数据
	 * @param offset
	 * @param limit
	 * @return
	 */
	public List<LvyeActivity> getUnEditPart(int offset,int limit){
		EntityManager manager = emf.createEntityManager();
		List<LvyeActivity> activities = manager.createQuery("select L from LvyeActivity L where L.editStatus = 0 order by L.id",LvyeActivity.class).setFirstResult(offset).setMaxResults(limit).getResultList();
		manager.close();
		return activities;
	}
	/**
	 * 获取有效时间的未编辑数据
	 * @param offset
	 * @param limit
	 * @return
	 */
	
	public List<LvyeActivity> getValidUnEditPart(int offset,int limit,Set<Long> editings){
		EntityManager manager = emf.createEntityManager();
		List<LvyeActivity> activities = manager.createNativeQuery("select * from lvye_activity where STR_TO_DATE(end_time, '%Y年%c月%e日') > ?end and edit_status = 0 and id not in (?editings) order by id", LvyeActivity.class).setParameter("editings", Joiner.on(",").join(editings)).setParameter("end", new Date()).setFirstResult(offset).setMaxResults(limit).getResultList();
		manager.close();
		return activities;
	}

	public LvyeActivity get(long id) {
		// TODO Auto-generated method stub
		EntityManager manager = emf.createEntityManager();
		LvyeActivity entity = manager.find(LvyeActivity.class, id);
		manager.close();
		return entity;
	}
}
