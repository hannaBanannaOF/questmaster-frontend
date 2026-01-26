import { CampaingDetail } from "./_ui/campaing-detail";

export default async function HomePage({params} : {params : Promise<{ id : number }>}) {
  const {id} = await params;
  return <CampaingDetail id={id}/>
}
