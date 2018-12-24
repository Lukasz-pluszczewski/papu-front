import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './FileInput.scss';

class FileInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    fileInputClassName: PropTypes.string,
    fakeInputClassName: PropTypes.string,
    disabled: PropTypes.bool,
    readContents: PropTypes.bool,
    showDetails: PropTypes.bool,
    multiple: PropTypes.bool,
    accept: PropTypes.string,
    onChange: PropTypes.func,
  };

  state = {
    files: [],
    fileContents: [],
  };

  mapFiles = (files, iteratee = el => el) => {
    let i = 0;
    const result = [];
    while (files[i]) {
      result.push(iteratee(files[i], i));
      i++;
    }
    return result;
  };

  prepareFilenames = files => {
    return this.mapFiles(files, file => file.name).join(', ');
  };

  handleChange = e => {
    const files = e.target.files;
    if (this.props.readContents) {
      return Promise.all(this.mapFiles(files, this.readFileContents))
        .then(results => {
          this.setState({
            files,
            fileContents: results,
          });
          if (this.props.onChange) {
            this.props.onChange(files, results);
          }
        });
    }
    this.setState({
      files,
    });
    if (this.props.onChange) {
      this.props.onChange(files);
    }
  };

  readFileContents = file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(e.target.result);
      };
      reader.readAsText(file);
    });
  };

  render() {
    const areFilesSelected = this.state.files && this.state.files.length;

    console.log('files', this.state.files);

    return (
      <div className={classnames('FileInput', this.props.className)}>
        <input
          className={classnames('FileInput__fileInput', this.props.fileInputClassName)}
          type="file"
          name={this.props.name}
          onChange={this.handleChange}
          disabled={this.props.disabled}
          accept={this.props.accept}
          multiple={this.props.multiple}
        />
        <div
          className={classnames(
            'FileInput__fakeInput',
            this.props.fileInputClassName,
            { 'FleInput__fakeInput--empty': !areFilesSelected }
          )}
        >
          {areFilesSelected ? this.prepareFilenames(this.state.files) : this.props.placeholder}
        </div>
        {this.props.showDetails
          ? (
            <div className="FileInput__filesDetails">
              {this.mapFiles(this.state.files, (file, index) => (
                <div className="FileInput__fileDetails" key={index}>
                  {`Filename: ${file.name}; size: ${file.size} B`}
                </div>
              ))}
            </div>
          )
          : null}
      </div>
    );
  }
}

export default FileInput;
