import React, { Component } from 'react'
import { Table } from 'antd'

export default class ETable extends Component{

  onRowClick = (record, index) => {
    let rowSelection = this.props.rowSelection
    if (rowSelection === 'checkbox') {
      let selectedRowKeys = this.props.selectedRowKeys
      let selectedItems = this.props.selectedItem
      let selectedIds = this.props.selectedIds

      if (selectedIds) {
        const i = selectedIds.indexof(record.id)
        if (i === -1) {
          selectedIds.push(record.id)
          selectedRowKeys.push(index)
          selectedItems.push(record)
        } else {
          selectedIds.splice(i, 1)
          selectedRowKeys.slice(i, 1)
          selectedItems.splice(i, 1)
        }
      } else {
        selectedIds = [record.id]
        selectedRowKeys = [index]
        selectedItems = [record]
      }
      this.props.updateSelectedItem(selectedRowKeys, selectedItems, selectedIds)
    } else {
      let selectedRowKeys = [index]
      let selectedItems = record
      this.props.updateSelectedItem(selectedRowKeys, selectedItems)
    }
  }

  tableInit = () => {
    let row_selection = this.props.rowSelection
    let selectedRowKeys = this.props.selectedRowKeys
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    if (row_selection === false || row_selection === null) {
      row_selection = false
    } else if (row_selection === 'checkbox') {
      row_selection.type = 'cehckbox'
    } else {
      row_selection = 'radio'
    }
    return (
      <Table
        bordered
        {...this.props}
        rowSelection={row_selection ? rowSelection: null }
        onRow={(record, index) => {
          return {
            onClick: () => {
              if (!row_selection) {
                return
              }
              this.onRowClick(record, index)
            }
          }
        }}
      />
    )
  }

  render () {
    return (
      <div>
        {
          this.tableInit()
        }
      </div>
    )
  }
}