package com.itravel.admin.dal.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the douban_activity database table.
 * 
 */
@Entity
@Table(name="douban_activity")
@NamedQuery(name="DoubanActivity.findAll", query="SELECT d FROM DoubanActivity d")
public class DoubanActivity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private long id;

	private String contact;

	@Lob
	private String content;

	private int convenience;

	private String depart;

	private String destination;

	@Column(name="end_time")
	private String endTime;

	private String fee;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="gmt_create")
	private Date gmtCreate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="gmt_modified")
	private Date gmtModified;

	private String images;

	private int originality;

	@Column(name="participation_type")
	private int participationType;

	private int popularity;

	private String recommender;

	private int scale;

	@Column(name="scenery_spot")
	private String scenerySpot;

	private String sponsor;

	@Column(name="start_time")
	private String startTime;

	private String tags;

	private String time;

	private String title;

	private String url;

	private String web;
	
	private String editor;
	
	@Column(name="edit_status")
	private int editStatus;

	public DoubanActivity() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getContact() {
		return this.contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getConvenience() {
		return this.convenience;
	}

	public void setConvenience(int convenience) {
		this.convenience = convenience;
	}

	public String getDepart() {
		return this.depart;
	}

	public void setDepart(String depart) {
		this.depart = depart;
	}

	public String getDestination() {
		return this.destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getEndTime() {
		return this.endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getFee() {
		return this.fee;
	}

	public void setFee(String fee) {
		this.fee = fee;
	}

	public Date getGmtCreate() {
		return this.gmtCreate;
	}

	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}

	public Date getGmtModified() {
		return this.gmtModified;
	}

	public void setGmtModified(Date gmtModified) {
		this.gmtModified = gmtModified;
	}

	public String getImages() {
		return this.images;
	}

	public void setImages(String images) {
		this.images = images;
	}

	public int getOriginality() {
		return this.originality;
	}

	public void setOriginality(int originality) {
		this.originality = originality;
	}

	public int getParticipationType() {
		return this.participationType;
	}

	public void setParticipationType(int participationType) {
		this.participationType = participationType;
	}

	public int getPopularity() {
		return this.popularity;
	}

	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}

	public String getRecommender() {
		return this.recommender;
	}

	public void setRecommender(String recommender) {
		this.recommender = recommender;
	}

	public int getScale() {
		return this.scale;
	}

	public void setScale(int scale) {
		this.scale = scale;
	}

	public String getScenerySpot() {
		return this.scenerySpot;
	}

	public void setScenerySpot(String scenerySpot) {
		this.scenerySpot = scenerySpot;
	}

	public String getSponsor() {
		return this.sponsor;
	}

	public void setSponsor(String sponsor) {
		this.sponsor = sponsor;
	}

	public String getStartTime() {
		return this.startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getTags() {
		return this.tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getTime() {
		return this.time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getWeb() {
		return this.web;
	}

	public void setWeb(String web) {
		this.web = web;
	}

	public String getEditor() {
		return editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public int getEditStatus() {
		return editStatus;
	}

	public void setEditStatus(int editStatus) {
		this.editStatus = editStatus;
	}

}