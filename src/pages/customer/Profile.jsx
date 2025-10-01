import ProfileHead from "../../components/ProfileHead";
import ProfileBottom from "../../components/ProfileBottom";
import React, { useState } from "react";

function Profile() {
	const [tap, setTap] = useState(1);

	return (
		<div>
			<ProfileHead setTap={setTap} tap={tap} />
			<ProfileBottom tap={tap} setTap={setTap} />
		</div>
	);
}

export default Profile;
