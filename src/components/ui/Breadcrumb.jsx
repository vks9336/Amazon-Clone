import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiHome } from 'react-icons/fi';

const Breadcrumb = ({ customPath = null }) => {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [];

    // Always start with home
    breadcrumbs.push({
      name: 'Home',
      path: '/',
      icon: <FiHome className="w-4 h-4" />
    });

    // Generate breadcrumbs from path
    let currentPath = '';
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      
      // Convert pathname to readable name
      const name = pathname
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        name: name,
        path: currentPath,
        isLast: index === pathnames.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = customPath || generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <FiArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          )}
          
          {breadcrumb.isLast ? (
            <span className="text-gray-900 dark:text-white font-medium flex items-center space-x-1">
              {breadcrumb.icon}
              <span>{breadcrumb.name}</span>
            </span>
          ) : (
            <Link
              to={breadcrumb.path}
              className="hover:text-blue-600 dark:hover:text-orange-500 transition-colors flex items-center space-x-1"
            >
              {breadcrumb.icon}
              <span>{breadcrumb.name}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;