import React from 'react';

export default function AssignPosting({
  postingLetterNo,
  setPostingLetterNo,
  district,
  setDistrict,
  batch,
  setBatch,
  hospital,
  setHospital,
  issueDate,
  setIssueDate,
  joiningLetterNo,
  setJoiningLetterNo,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  bondNotCompleted,
  setBondNotCompleted,
  noticeLetterNo,
  setNoticeLetterNo,
  noticeDate,
  setNoticeDate,
  handleAssignCancel,
  handleAssignSave,
  showAssignForm,
  editingId,
  postings,
  setEditingId,
  setShowAssignForm,
  setPostings,
  themeColor,
  selectedStudent
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-slate-700">Assign Posting</h3>
        {selectedStudent && (
          <span className="text-base font-medium text-slate-600">For: {selectedStudent.name}</span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Posting Letter No*</label>
          <input
            value={postingLetterNo}
            onChange={(e) => setPostingLetterNo(e.target.value)}
            placeholder="Enter Posting Letter No #"
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">District*</label>
          <input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter district"
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Batch</label>
          <input
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            placeholder="Enter batch"
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Hospital*</label>
          <input
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            placeholder="Enter hospital"
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Issue Date*</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Joining Letter No*</label>
          <input
            value={joiningLetterNo}
            onChange={(e) => setJoiningLetterNo(e.target.value)}
            placeholder="Enter Joining Letter No #"
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>
      </div>


      <div className="mt-6 flex justify-end gap-3">
        <button onClick={handleAssignCancel} className="px-4 py-2 rounded border border-slate-300 text-slate-700">Cancel</button>
        <button onClick={handleAssignSave} className={`px-4 py-2 rounded ${themeColor} text-white`}>Save</button>
      </div>
    </div>
  );
}
