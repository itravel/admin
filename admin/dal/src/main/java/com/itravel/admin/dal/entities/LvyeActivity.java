package com.itravel.admin.dal.entities;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the lvye_activity database table.
 * 
 */
@Entity
@Table(name="lvye_activity")
@NamedQuery(name="LvyeActivity.findAll", query="SELECT l FROM LvyeActivity l")
public class LvyeActivity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	@Lob
	private String content;

	@Column(name="destination_address")
	private String destinationAddress;

	private String editor;

	@Column(name="end_time")
	private String endTime;

	private String feature;

	@Column(name="from_address")
	private String fromAddress;

	@Column(name="edit_status")
	private int editStatus;

	private String jiaotong;

	private String price;

	private String scenic;

	private String sponsor;

	@Column(name="start_time")
	private String startTime;

	private String title;

	private String url;

	public LvyeActivity() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getDestinationAddress() {
		return this.destinationAddress;
	}

	public void setDestinationAddress(String destinationAddress) {
		this.destinationAddress = destinationAddress;
	}

	public String getEditor() {
		return this.editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public String getEndTime() {
		return this.endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getFeature() {
		return this.feature;
	}

	public void setFeature(String feature) {
		this.feature = feature;
	}

	public String getFromAddress() {
		return this.fromAddress;
	}

	public void setFromAddress(String fromAddress) {
		this.fromAddress = fromAddress;
	}

	public int getEditStatus() {
		return this.editStatus;
	}

	public void setEditStatus(int editStatus) {
		this.editStatus = editStatus;
	}

	public String getJiaotong() {
		return this.jiaotong;
	}

	public void setJiaotong(String jiaotong) {
		this.jiaotong = jiaotong;
	}

	public String getPrice() {
		return this.price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getScenic() {
		return this.scenic;
	}

	public void setScenic(String scenic) {
		this.scenic = scenic;
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

}