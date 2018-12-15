import React from 'react';
import { notification, Icon } from 'antd';

const notificationStyles = {
  defaut: {
    opacity: '0.9',
  },
  success: {
    background: '#73d13d',
  },
  error: {
    background: '#e64a42',
  },
  info: {},
};

const notificationConfig = {
  defaut: {
    icon: <Icon type="exclamation-circle" />,
  },
  success: {
    icon: <Icon type="check-circle" />,
  },
  error: {
    icon: <Icon type="close-circle" />,
  },
  info: {},
};

const notificationService = {
  success: (message, description, config = {}, style = {}) => {
    notification.open({
      message,
      description,
      ...notificationConfig.defaut,
      ...notificationConfig.success,
      ...config,
      style: {
        ...notificationStyles.defaut,
        ...notificationStyles.success,
        ...style,
      },
    });
  },
  error: (message, description, config = {}, style = {}) => {
    notification.open({
      message,
      description,
      ...notificationConfig.defaut,
      ...notificationConfig.error,
      ...config,
      style: {
        ...notificationStyles.defaut,
        ...notificationStyles.error,
        ...style,
      },
    });
  },
  info: (message, description, config = {}, style = {}) => {
    notification.open({
      message,
      description,
      ...notificationConfig.defaut,
      ...notificationConfig.info,
      ...config,
      style: {
        ...notificationStyles.defaut,
        ...notificationStyles.info,
        ...style,
      },
    });
  },
};

export default notificationService;
