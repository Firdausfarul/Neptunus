import SelectMenu from "./SelectMenu";
import Slippage from "./Slippage";
import Notification from "./Notification";
import { useRef } from "react";

const TransactionForm = (props) => {
  const assetSendRef = useRef();
  const assetReceiveRef = useRef();
  const {
    state,
    handleSubmit,
    handleChange,
    loginFreighter,
    closeNotification,
    setMaxBalance,
  } = props;
  const {
    account,
    amountSend,
    amountReceive,
    assetSend,
    assetReceive,
    slippage,
    isNotificationOpen,
    notificationContent,
    notificationColor,
    isSubmitting,
    listTransaction,
  } = state;
  return (
    <div className="w-full md:w-8/12 mx-auto bg-gray-800 py-10 px-8 md:px-16 rounded-lg shadow-lg border-4 border-gray-700">
      <h2 className="font-bold text-white text-2xl text-center">SWAP ASSETS</h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-5">
        {isNotificationOpen && (
          <Notification
            notificationColor={notificationColor}
            notificationContent={notificationContent}
            closeNotification={closeNotification}
          />
        )}
        <div className="flex space-x-1">
          <label
            htmlFor="amount"
            className="relative block text-white flex-grow"
          >
            <span className="absolute text-xs pl-2 pt-2 cursor-text">
              AMOUND SEND
            </span>
            <input
              type="number"
              step={0.0000001}
              id="amountSend"
              name="amountSend"
              value={amountSend}
              ref={assetSendRef}
              onChange={() => handleChange(assetSendRef)}
              min="0"
              placeholder="0.0000000"
              className=" outline-none px-2 pt-4 pb-2 bg-gray-900 rounded-l-lg text-lg focus:bg-black focus:ring-2 focus:ring-blue-800 duration-200 w-full"
            />
          </label>
          <SelectMenu
            listAsset={account ? account.listAsset : []}
            name="assetSend"
            onChange={handleChange}
            assetReceive={assetReceive}
          />
        </div>
        <div className="flex space-x-1">
          <label
            htmlFor="recieved"
            className="relative block text-white flex-grow"
          >
            <span className="absolute text-xs pl-2 pt-2 cursor-default">
              ESTIMATED AMOUNT RECEIVED
            </span>
            <input
              type="number"
              step={0.0000001}
              id="amountReceive"
              name="amountReceive"
              value={amountReceive}
              ref={assetReceiveRef}
              onChange={() => handleChange(assetReceiveRef)}
              readOnly
              placeholder="0.0000000"
              className=" outline-none px-2 pt-4 pb-2 bg-gray-900 rounded-l-lg text-lg focus:bg-black focus:ring-2 focus:ring-blue-800 duration-200 w-full cursor-default"
            />
          </label>
          <SelectMenu
            listAsset={account ? account.listAsset : []}
            name="assetReceive"
            onChange={handleChange}
            assetReceive={assetReceive}
          />
        </div>
        <Slippage slippage={slippage} onChange={handleChange} />
        <input
          type="submit"
          value={
            account
              ? isSubmitting
                ? `Submitting...`
                : `Submit`
              : `Login With Freighter`
          }
          onClick={!account ? loginFreighter : undefined}
          className=" bg-indigo-700 hover:bg-indigo-800 duration-200 text-white rounded-lg py-3 focus:ring-2 focus:ring-blue-800 font-bold"
        />
      </form>
    </div>
  );
};

export default TransactionForm;