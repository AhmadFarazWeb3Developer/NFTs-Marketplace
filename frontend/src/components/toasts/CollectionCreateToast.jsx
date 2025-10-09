const CollectionCreatedToast = ({ collectionEventInfo }) => {
  if (!collectionEventInfo) return null;

  return (
    <div
      className="flex flex-col font-light gap-3 p-5 w-fit  bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(192,192,192,0.2)] rounded-2xl shadow-lg font-unbounded text-[var(--color-paragraph)]"
      style={{
        fontFamily: "var(--font-unbounded)",
      }}
    >
      <div className="text-lg text-[var(--color-action-btn-green)]">
        Collection Created
      </div>

      <div className="border-t border-[rgba(192,192,192,0.2)] my-1"></div>

      <div className="text-sm break-all">
        ID: {collectionEventInfo.collectionId}
      </div>

      <div className="text-sm break-all">
        Creator: {collectionEventInfo.creator}
      </div>

      <div className="text-sm break-all">
        Collection Address: {collectionEventInfo.collectionAddress}
      </div>
    </div>
  );
};

export default CollectionCreatedToast;
