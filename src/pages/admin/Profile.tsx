import TitleWrapper from '@components/profile/TitleWrapper'
import { IRouterProps } from '@interface'
import {
  Button,
  Tag,
} from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import injectSheet from 'react-jss'
import { useMappedState } from 'redux-react-hook'

const Profile = ({ classes }: IRouterProps) => {

  return (
    <div>
      <TitleWrapper title="Basic Info">
        <span>Basic Info Part</span>
      </TitleWrapper>

      <TitleWrapper title="Education Info">
        <span>Education Info Part</span>
      </TitleWrapper>

      <TitleWrapper title="Project Info">
        <span>Project Info Part</span>
      </TitleWrapper>

      <TitleWrapper title="Experience Info">
        <span>Experience Info Part</span>
      </TitleWrapper>
    </div>
  )
}

export default injectSheet({

})(Profile)
