package com.itravel.admin.services.rest.aos;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class ActivityEditingEntity {
	private long aId;
	private String editor;
	private int status;
	public long getaId() {
		return aId;
	}
	public void setaId(long aId) {
		this.aId = aId;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
	
}
