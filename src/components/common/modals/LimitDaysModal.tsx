import { ErrorIcon } from "@/public/svgs";
import { Modal } from "./Main";

export const LimitDaysModal = ({ onClose }: { onClose: () => void }) => (
  <Modal>
    <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none">
      {/* Body */}
      <div className="py-10 flex flex-col gap-2 items-center">
        <div className="w-20">
          <ErrorIcon color={"var(--warning)"} />
        </div>
        <h3>You can select maximum of 7 days.</h3>
      </div>

      {/* Footer */}
      <div className="p-4 rounded-b-xl bg-light-bg text-right">
        <button className="primary-btn sm-btn disabled:opacity-40" type="button" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  </Modal>
);
