import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';

// ag-Grid
import {AgGridReact} from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';

class IssueListItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      issues: this.props.issues,
      columnDefs: [{
        headerName: 'Priority',
        field: 'priority',
        sortable: true,
        filter: true
      }, {
        headerName: 'Status',
        field: 'status',
        sortable: true,
        filter: true
      }, {
        headerName: 'Created',
        field: 'relativeDate',
        sortable: true,
        filter: true
      }, {
        headerName: 'Title',
        field: 'title',
        sortable: true,
        filter: true
      }, {
        headerName: 'Description',
        field: 'content',
        sortable: true,
        filter: true
      }, {
        headerName: 'Project',
        field: 'project',
        valueGetter: (params) => params.data.project.name,
        sortable: true,
        filter: true
      }, {
        headerName: 'Followers',
        field: 'followers',
        valueGetter: (params) => params.data.followers.length,
        sortable: true
      }, {
        headerName: 'Comments',
        field: 'comments',
        valueGetter: (params) => params.data.comments.length,
        sortable: true
      }]
    };
  }

  onGridReady = (params) => {
    const { mode } = this.props;
    this.gridApi = params.api;
    this.gridApi.mode = mode;

    this.gridApi.sizeColumnsToFit();
  }

  render () {
    return (
      <div style={{ height: '300px', width: '100%' }} className="ag-theme-balham">
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.props.issues}
          modules={AllCommunityModules}>
        </AgGridReact>
      </div>
    );
  }
}

export default withAuth(IssueListItem);
