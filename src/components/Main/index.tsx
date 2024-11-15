import { Users } from '../Users'
import { Posts } from '../Posts'
import * as sx from './styles';
import { useState } from 'react';

export const Main = () => {
  const [userId, setUserId] = useState<string>('')

  return (
    <div style={sx.main}>
    <Users changeId={setUserId}/>
    <Posts userId={userId}/>
    </div>
  )
}
