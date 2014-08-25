package com.itravel.admin.services.rest.params;

import java.io.Serializable;
import java.text.ParseException;

import javax.ws.rs.FormParam;
import javax.ws.rs.PathParam;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.time.DateUtils;

public class ActivityBeanParam implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4798249245189644569L;
	
	/**
	 * id
	 */
	@FormParam(value="id")
	private long id;
	
	/**
	 * 标题
	 */
	@FormParam(value = "title") 
	String title;//必填
	
	/**
	 * 内容
	 */
	@FormParam(value = "content") 
	String content;//必填
	
	/**
	 * 开始时间
	 */
	@FormParam(value = "startTime") 
	String startTime;//必填
	
	/**
	 * 结束时间
	 */
	@FormParam(value = "endTime") 
	String endTime;//必填
	

	/**
	 * 出发城市
	 */
	@FormParam(value="fromCity")
	private String fromCity;
	
	/**
	 * 出发地址
	 */
	@FormParam(value="fromAddress")
	private String fromAddress;

	/**
	 * 目的地城市
	 */
	@FormParam(value="destinationCity")
	private String destinationCity;
	
	/**
	 * 目的地地址
	 */
	@FormParam(value="destinationAddress")
	private String destinationAddress;

	

	/**
	 * 目的地纬度
	 */
	@FormParam(value="destinationLatitude")
	private double destinationLatitude;

	/**
	 * 目的地经度
	 */
	@FormParam(value="destinationLongitude")
	private double destinationLongitude;

	
	/**
	 * 活动图片
	 */
	@FormParam(value="images")
	private String images;
	
	/**
	 * 活动联系人
	 */
	@FormParam(value="contact")
	private String contact;
	
	/**
	 * 活动推荐人
	 */
	@FormParam(value="recommender")
	private String recommender;
	
	/**
	 * 活动主办方
	 */
	@FormParam(value="sponsor")
	private String sponsor;
	
	/**
	 * 活动标签
	 */
	@FormParam(value="tags")
	private String tags;
	
	
	/**
	 * 活动参与类型
	 */
	@FormParam(value="participationType")
	private int participationType;

	/**
	 * 活动规模
	 */
	@FormParam(value="scale")
	private int scale;
	
	/**
	 * 活动费用
	 */
	@FormParam(value="fee")
	private int fee;
	
	/**
	 * 活动名气
	 */
	@FormParam(value="popularity")
	private int popularity;

	/**
	 * 活动交通方便度
	 */
	@FormParam(value="convenience")
	private int convenience;
	

	/**
	 * 活动独特性
	 */
	@FormParam(value="originality")
	private int originality;
	
	@FormParam(value="journey")
	private String journey;
	
	@FormParam(value="tips")
	private String tips;
	
	
	public boolean validate(){
		if(StringUtils.isNotEmpty(this.title)
				&&StringUtils.isNotEmpty(this.content)
				&&StringUtils.isNotEmpty(this.startTime)
				&&StringUtils.isNotEmpty(this.endTime)
				&&StringUtils.isNotEmpty(this.fromCity)
				&&StringUtils.isNotEmpty(this.destinationCity)
				&&StringUtils.isNotEmpty(this.destinationAddress)
				&&StringUtils.isNotEmpty(this.images)
				&&StringUtils.isNotEmpty(this.tags)
				&&this.participationType>0
				&&this.popularity >0
				&&this.originality >0
				&&this.convenience >0){
			
			try {
				DateUtils.parseDateStrictly(this.startTime, "yyyy-MM-dd");
				DateUtils.parseDateStrictly(this.endTime, "yyyy-MM-dd");
				return true;
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
				
			
			return false;
		}
				
		return false;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public long getId() {
		return id;
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

	public String getFromCity() {
		return fromCity;
	}

	public void setFromCity(String fromCity) {
		this.fromCity = fromCity;
	}

	public String getFromAddress() {
		return fromAddress;
	}

	public void setFromAddress(String fromAddress) {
		this.fromAddress = fromAddress;
	}

	public String getDestinationCity() {
		return destinationCity;
	}

	public void setDestinationCity(String destinationCity) {
		this.destinationCity = destinationCity;
	}

	public String getDestinationAddress() {
		return destinationAddress;
	}

	public void setDestinationAddress(String destinationAddress) {
		this.destinationAddress = destinationAddress;
	}

	public double getDestinationLatitude() {
		return destinationLatitude;
	}

	public void setDestinationLatitude(double destinationLatitude) {
		this.destinationLatitude = destinationLatitude;
	}

	public double getDestinationLongitude() {
		return destinationLongitude;
	}

	public void setDestinationLongitude(double destinationLongitude) {
		this.destinationLongitude = destinationLongitude;
	}

	public String getImages() {
		return images;
	}

	public void setImages(String images) {
		this.images = images;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getRecommender() {
		return recommender;
	}

	public void setRecommender(String recommender) {
		this.recommender = recommender;
	}

	public String getSponsor() {
		return sponsor;
	}

	public void setSponsor(String sponsor) {
		this.sponsor = sponsor;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public int getParticipationType() {
		return participationType;
	}

	public void setParticipationType(int participationType) {
		this.participationType = participationType;
	}

	public int getScale() {
		return scale;
	}

	public void setScale(int scale) {
		this.scale = scale;
	}

	public int getFee() {
		return fee;
	}

	public void setFee(int fee) {
		this.fee = fee;
	}

	public int getPopularity() {
		return popularity;
	}

	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}

	public int getConvenience() {
		return convenience;
	}

	public void setConvenience(int convenience) {
		this.convenience = convenience;
	}

	public int getOriginality() {
		return originality;
	}

	public void setOriginality(int originality) {
		this.originality = originality;
	}

	public String getJourney() {
		return journey;
	}

	public void setJourney(String journey) {
		this.journey = journey;
	}

	public String getTips() {
		return tips;
	}

	public void setTips(String tips) {
		this.tips = tips;
	}
}
