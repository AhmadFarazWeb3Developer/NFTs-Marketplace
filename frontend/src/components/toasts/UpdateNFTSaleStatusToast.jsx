const UpdateNFTSaleStatusToast = ({ eventInfo }) => {
  if (!eventInfo) return null;

  return (
    <div
      className="flex flex-col font-light gap-3 p-5 bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(192,192,192,0.2)] rounded-2xl shadow-lg font-unbounded text-[var(--color-paragraph)]"
      style={{
        fontFamily: "var(--font-unbounded)",
      }}
    >
      <div className="text-lg text-[var(--color-action-btn-green)]">
        NFT Sale Status Updated
      </div>

      <div className="border-t border-[rgba(192,192,192,0.2)] my-1"></div>

      <div className="text-sm break-all flex gap-1">
        <span className="text-gray-400 ">Token ID:</span>

        {eventInfo.tokenID}
      </div>

      <div className="text-sm break-all flex gap-1">
        <span className="text-gray-400 ">Status:</span>
        {eventInfo.isAllowed ? "For Sale" : "Not For Sale"}
      </div>

      <div className="text-sm break-all flex gap-1">
        <span className="text-gray-400 ">Updater:</span>
        {eventInfo.updatedBy}
      </div>
    </div>
  );
};

export default UpdateNFTSaleStatusToast;
