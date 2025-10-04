import React from "react";
import { Link } from "react-router-dom";
function Unauthorized() {
	return (
		<div className="absolute  top-1/2 left-1/2">
			<p>unauthorized</p>
			<Link to="/" className="text-blue-500">go home</Link>
		</div>
	);
}

export default Unauthorized;
