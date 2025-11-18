'use client'
import { useState, useEffect } from "react";
import { friendService } from '@/services/friendService';
import { expenseService } from "@/services/expenseService";

const AddExpense = ({ show, onClose }: any) => {
  if (!show) return null;

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [isPersonal, setIsPersonal] = useState<boolean | null>(false);

  const [shareType, setShareType] = useState<"equal" | "percentage" | "fixed">("equal");

  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);
  const [participants, setParticipants] = useState<
    Array<{ id: number; name: string; selected: boolean; share_value: string }>
  >([]);

  const [validationMessage, setValidationMessage] = useState("");

  // Load friends
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await friendService.getFriends();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      }
    };
    fetchFriends();
  }, []);

  // Sync participants with users
  useEffect(() => {
    setParticipants(
      users.map(u => ({
        id: u.id,
        name: u.name,
        selected: false,
        share_value: ""
      }))
    );
  }, [users]);

  // Auto-fill equal shares
    useEffect(() => {
    if (shareType !== "equal") return;

    // Only use selected participants
    const selected = participants.filter(p => p.selected);
    if (selected.length === 0) return;

    const equalValue = (Number(amount) / selected.length).toFixed(2);

    // Update participants
    setParticipants(prev =>
        prev.map(p => ({
        ...p,
        share_value: p.selected ? equalValue : ""
        }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shareType, amount, participants.map(p => p.selected).join(",")]);

  const toggleParticipant = (id: number) => {
    setParticipants(prev =>
      prev.map(p => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  const updateShareValue = (id: number, value: string) => {
    setParticipants(prev =>
      prev.map(p => (p.id === id ? { ...p, share_value: value } : p))
    );
  };

  // Validate shares
  useEffect(() => {
    if (isPersonal) {
      setValidationMessage("");
      return;
    }

    const selected = participants.filter(p => p.selected);

    if (selected.length === 0) {
      setValidationMessage("Select at least one participant");
      return;
    }

    if (shareType === "percentage") {
      const total = selected.reduce((sum, p) => sum + Number(p.share_value || 0), 0);
      if (total !== 100) {
        setValidationMessage(`Total percentage must be 100. Current: ${total}`);
        return;
      }
    }

    if (shareType === "fixed") {
      const total = selected.reduce((sum, p) => sum + Number(p.share_value || 0), 0);
      if (Number(amount) && total !== Number(amount)) {
        setValidationMessage(`Total fixed shares must equal ${amount}. Current: ${total}`);
        return;
      }
    }

    setValidationMessage("");
  }, [participants, shareType, amount, isPersonal]);

  const handleSubmit = async () => {
    if (validationMessage) return;

    const selected = participants.filter(p => p.selected);

    const payload = {
      name,
      amount: Number(amount),
      paid_id: Number(paidBy),
      is_personal: isPersonal,
      participants: isPersonal
        ? undefined
        : selected.map(p =>
            shareType === "equal"
              ? { id: p.id, share_type: "equal" }
              : { id: p.id, share_type: shareType, share_value: Number(p.share_value) }
          )
    };

    await expenseService.AddExpense(payload);
    console.log("Final Payload:", payload);
    onClose();
  };

  const isSaveDisabled = Boolean(validationMessage) || !name || !amount || (!isPersonal && !paidBy);

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        className="modal-content p-3"
        style={{
          width: "94%",
          maxWidth: "460px",
          background: "white",
          borderRadius: "10px",
          maxHeight: "90vh",
          overflowY: "auto"
        }}
      >
        <h5 className="mb-3">Add Expense</h5>

        {/* Expense Name */}
        <div className="mb-2">
          <label className="form-label">Expense Name</label>
          <input
            className="form-control"
            placeholder="Enter expense name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Expense Amount */}
        <div className="mb-2">
          <label className="form-label">Expense Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Is Personal */}
        <div className="mb-3">
            <label className="form-label d-block">Is Personal?</label>
            <div className="form-check form-check-inline">
                <input
                type="radio"
                className="form-check-input"
                name="isPersonal"
                checked={isPersonal === true} // bind checked
                onChange={() => setIsPersonal(true)}
                />
                <label className="form-check-label">Yes</label>
            </div>

            <div className="form-check form-check-inline">
                <input
                type="radio"
                className="form-check-input"
                name="isPersonal"
                checked={isPersonal === false} // bind checked
                onChange={() => setIsPersonal(false)}
                />
                <label className="form-check-label">No</label>
            </div>
        </div>

        {!isPersonal && (
          <>
            {/* Paid By */}
            <div className="mb-2">
              <label className="form-label">Paid By</label>
              <select
                className="form-select"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
              >
                <option value="">Select person</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>

            {/* Share Type */}
            <div className="mb-3">
              <label className="form-label">Share Type</label>
              <select
                className="form-select"
                value={shareType}
                onChange={(e) => setShareType(e.target.value as any)}
              >
                <option value="equal">Equal</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>

            {/* Participants */}
            <div className="mb-3">
              <label className="form-label">Select Participants</label>
              <div className="border rounded p-2">
                {participants.map(p => (
                  <div key={p.id} className="form-check border-bottom py-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={p.selected}
                      onChange={() => toggleParticipant(p.id)}
                    />
                    <label className="form-check-label">{p.name}</label>

                    {/* Share input if percentage/fixed */}
                    {p.selected && shareType !== "equal" && (
                      <input
                        type="number"
                        className="form-control form-control-sm mt-1"
                        placeholder={shareType === "percentage" ? "Enter %" : "Enter fixed amount"}
                        value={p.share_value}
                        onChange={(e) => updateShareValue(p.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Validation message */}
        {validationMessage && (
          <div className="alert alert-danger">{validationMessage}</div>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-secondary me-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isSaveDisabled}
          >
            Save Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
