import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import saveAs from 'file-saver';

import Divider from '../Divider/Divider';
import FileInput from '../FileInput/FileInput';

import { Button, Alert } from 'antd';

import './BackupForm.scss';

const AVERAGE_CHARACTERS_PER_KB = 1148;
const backupAgeThreshold = 604800; // seconds in a week

class BackupForm extends Component {
  static propTypes = {
    backup: PropTypes.string,
    sendFile: PropTypes.func,
  };

  state = {
    file: null,
    valid: null,
    tooOld: null,
  };

  handleSave = () => {
    const filename = `papu-backup-${moment().format('DD-MM-YYYY')}.json`;
    const blob = new Blob([this.props.backup], { type: 'application/json;charset=utf-8' });
    saveAs(blob, filename);
  };

  handleFileChange = (files, filesContents) => {
    console.log('handleFileChange', files, filesContents);
    if (files && filesContents) {
      this.setState({
        file: files[0],
        ...this.getFileData(filesContents[0]),
      });
    }
  };

  handleSubmit = () => {
    if (this.state.file && this.state.valid) {
      this.submitFile(this.state.file);
    }
  };

  submitFile = file => {
    const formData = new FormData();
    formData.append('backup', file);
    formData.append('test', 'foobrabaz');
    console.log('formData', file, formData);
    this.props.sendFile(formData);
  };

  getFileData = fileContents => {
    let backup;
    try {
      backup = JSON.parse(fileContents);
    } catch (e) {
      return {
        valid: false,
        tooOld: false,
      };
    }
    if (!backup.timestamp || backup.name !== 'papu-data-backup') {
      return {
        valid: false,
        tooOld: false,
      };
    }
    return {
      valid: true,
      tooOld: moment().diff(moment(backup.timestamp), 'seconds') > backupAgeThreshold,
    };
  };

  estimateSize = text => {
    if (text) {
      return JSON.stringify(text).length / AVERAGE_CHARACTERS_PER_KB;
    }
    return 0;
  };

  render() {
    const valid = this.state.valid;
    const tooOld = this.state.tooOld;

    return (
      <div className="BackupForm">
        <Button
          type="primary"
          onClick={this.handleSave}
          disabled={!this.props.backup}
          loading={!this.props.backup}
        >
          {this.props.backup ? `Download ${this.estimateSize(this.props.backup).toFixed(0)}KB` : 'Download'}
        </Button>
        <Divider spacing="large" />
        <form onSubmit={this.handleFormSubmit}>
          <FileInput
            className="BackupForm__fileInput"
            name="backup"
            accept=".json"
            placeholder="Backup"
            onChange={this.handleFileChange}
            showDetails
            readContents
          />
          <Divider hideBorder />
          {this.state.file && !valid ? (
            <Alert
              message="Invalid file"
              description="Selected file is not a valid papu backup file"
              type="error"
            />
          ) : null}
          {this.state.file && tooOld ? (
            <Alert
              message="Old backup"
              description="Backup seems to be older than a week. Consider uploading more recent backup."
              type="warning"
            />
          ) : null}
          <Button
            className="BackupForm__submitButton"
            type="primary"
            disabled={!this.state.file || !valid}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default BackupForm;
