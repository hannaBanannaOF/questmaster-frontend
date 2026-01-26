import { InviteDetails } from "./_ui/invite-details";

export default async function HomePage({params} : {params : Promise<{ hash : string }>}) {
  const {hash} = await params;
  return <InviteDetails inviteHash={hash}/>
}
