import React, { useRef } from 'react'
import styled from 'styled-components'
import { BannerClient as Banner } from '@/component-list/banner'
import { ParagraphClient as Paragraph } from '@/component-list/paragraph'
import { TextClient as Text } from '@/component-list/text'
import { ImageClient as Image } from '@/component-list/image'
import Wrap from '@/component-list/common/ComponentWrap'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentSelectComponent } from '@/client/actions/currentSelectComponent'
import { addComponent, addComponentFromWrap } from '@/client/actions/componentList'
import { useGetComponentList, useGetCurrentSelectComponent } from '@/client/hooks'
import { Result, Button } from 'antd'

const Viewer = styled.div`
  position: relative;
  margin: 40px auto;
  width: 375px;
  height: 667px;
  background-color: #fff;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0,0,0,0.06);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0,0,0,0.12);
  }
`
const Empty = styled.div`
  border: 2px dashed #ccc;
  border-radius: 4px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  height: 120px;
`

const componentMap = {
  'banner': (props, select) => <Banner onClick={select} {...props} />,
  'paragraph': (props, select) => <Paragraph onClick={select} {...props} />,
  'text': (props, select) => <Text onClick={select} {...props} />,
  'image': (props, select) => <Image onClick={select} {...props} />
}

function SandBox() {

  const dispatch = useDispatch()
  const componentList = useGetComponentList()

  const select = (key) => {
    dispatch(setCurrentSelectComponent(key))
  }

  const add = () => {
    dispatch(addComponent())
  }

  const addOver = (e) => {
    dispatch(addComponentFromWrap(e.key, 'over'))
  }
  const addUnder = (e) => {
    dispatch(addComponentFromWrap(e.key, 'under'))
  }

  return (
    <Viewer>
      {
        componentList && componentList.length > 0 ? componentList.map((item) => {
          if (item.type === 'empty') {
            return <Empty key={item.key}>请在此处添加组件</Empty>
          }
          return <Wrap
            key={item.key}
            component={item}
            addComponentOver={addOver}
            addComponentUnder={addUnder}
          >
            {componentMap[item.type](item.props, () => select(item.key))}
          </Wrap>
        }) : <Result
            status="info"
            subTitle="请先添加组件"
            extra={<Button type="primary" onClick={add}>添加组件</Button>}
          />
      }
    </Viewer>
  )
}

export default SandBox
