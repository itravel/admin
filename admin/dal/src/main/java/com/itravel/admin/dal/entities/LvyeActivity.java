package com.itravel.admin.dal.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * Entity implementation class for Entity: LvyeActivity
 *
 */
@Entity
@Table(name="lvye_activity")
public class LvyeActivity implements Serializable {

	@Id
	private long id;
	
	@Column(name="title")
	private String title;
	
	@Column(name="url")
	private String url;
	
	@Column(name="feature")
	private String feature;
	
	@Column(name="scenic")
	private String scenic;
	
	@Column(name="from_loc")
	private String fromLoc;

	@Column(name="to_loc")
	private String toLoc;
	
	@Column(name="start_time")
	private String startTime;
	
	@Column(name="end_time")
	private String endTime;
	
	@Column(name="has_edit")
	private boolean hasEdit;
	
	@Column(name="editor")
	private String editor;
	
	private static final long serialVersionUID = 1L;

	public LvyeActivity() {
		super();
	}   
	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getFeature() {
		return feature;
	}
	public void setFeature(String feature) {
		this.feature = feature;
	}
	public String getScenic() {
		return scenic;
	}
	public void setScenic(String scenic) {
		this.scenic = scenic;
	}
	public String getFromLoc() {
		return fromLoc;
	}
	public void setFromLoc(String fromLoc) {
		this.fromLoc = fromLoc;
	}
	public String getToLoc() {
		return toLoc;
	}
	public void setToLoc(String toLoc) {
		this.toLoc = toLoc;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
	
   
	public boolean isHasEdit() {
		return hasEdit;
	}
	public void setHasEdit(boolean hasEdit) {
		this.hasEdit = hasEdit;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return ToStringBuilder.reflectionToString(this);
	}
}
