import { collection, doc, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { IInvite } from '../../types/data';
import { auth, database } from '../../utils/firebase';
import shortid from 'shortid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { roomId } = JSON.parse(req.body);

    const invite = await createInvite(roomId);

    res.send(invite);
  }

  res.end();
}

const createInvite = async (roomId: string) => {
  const roomsCollection = collection(database, 'rooms');
  const document = doc(roomsCollection, roomId);
  const invite: IInvite = {
    inviteCode: shortid.generate(),
    isActive: true,
  };

  await updateDoc(document, { invite });
  return invite;
};
