import { IComponentProps } from '@interface/index'
import service from '@services'
import { Button, Icon, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'
import * as React from 'react'
import { useState } from 'react'
import injectSheet from 'react-jss'

const UploadBtn = ({ classes }: IComponentProps) => {
  const [uploading, setUploading] = useState(false)
  const [fileList, setFileList] = useState([] as RcFile[])

  const onRemove = (file: RcFile) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    setFileList(newFileList)
  }

  const beforeUpload = (file: RcFile) => {
    setFileList([...fileList, file])
    return false
  }

  const handleUpload = async () => {
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file)
    })

    setUploading(true)

    await service.post.upload(fileList[0])
  }

  return (
    <div>
      <Upload onRemove={onRemove}
              fileList={fileList}
              multiple={false}
              beforeUpload={beforeUpload}>
        <Button>
          <Icon type="upload"/> Select File
        </Button>
      </Upload>
      <Button
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
        type='primary'>
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </div>
  )
}

export default injectSheet({

})(UploadBtn)