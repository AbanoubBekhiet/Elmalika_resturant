import React from "react";
import TableHeader from "./OrdersTablePage/OrdersTable/TableHeader";
import TableRow from "./TableRow";
import { ToastContainer } from "react-toastify";

const OrdersTable = ({ orders }) => (
	<div className="overflow-x-auto rounded-lg border">
		<table className="min-w-full text-right">
			<TableHeader />
			<tbody>
				{orders.map((order) => (
					<TableRow key={order.id} order={order} />
				))}
			</tbody>
		</table>
			<ToastContainer
				rtl
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
	</div>
);
export default OrdersTable;
