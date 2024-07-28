import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const enrollmentColumns = [
    {
      title: 'Student ID',
      dataIndex: 'student',
      key: 'studentId',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
        return (
            <Input 
               style={{borderColor: '#CFCFCF' }} 
               autoFocus 
               placeholder='Enter Student ID' 
               value={selectedKeys[0]}
               onChange={(e) => {
                 setSelectedKeys(e.target.value ? [e.target.value] : []);
                 confirm({closeDropdown: false})
                }
               }
               onPressEnter={() => {confirm()}} 
               onBlur={() => {confirm()}}>
            </Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.student.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Course ID',
      dataIndex: 'course',
      key: 'courseId',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
        return (
            <Input 
               style={{borderColor: '#CFCFCF' }} 
               autoFocus 
               placeholder='Enter Course ID' 
               value={selectedKeys[0]}
               onChange={(e) => {
                 setSelectedKeys(e.target.value ? [e.target.value] : []);
                 confirm({closeDropdown: false})
                }
               }
               onPressEnter={() => {confirm()}} 
               onBlur={() => {confirm()}}>
            </Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.course.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  export const pendingEnrollmentColumns = [
    {
      title: 'Student ID',
      dataIndex: ['student', '_id'], // Access nested property
      key: 'studentId',
      // Rest of the column definition remains the same...
    },
    {
      title: 'Course ID',
      dataIndex: ['course', '_id'], // Access nested property
      key: 'courseId',
      // Rest of the column definition remains the same...
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  export const courseColumns = [
    {
      title: 'Course ID',
      dataIndex: 'code',
      key: 'courseId',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
        return (
            <Input 
               style={{borderColor: '#CFCFCF' }} 
               autoFocus 
               placeholder='Enter Course ID' 
               value={selectedKeys[0]}
               onChange={(e) => {
                 setSelectedKeys(e.target.value ? [e.target.value] : []);
                 confirm({closeDropdown: false})
                }
               }
               onPressEnter={() => {confirm()}} 
               onBlur={() => {confirm()}}>
            </Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.code.toLowerCase().includes(value.toLowerCase());
      },
     
    },
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'courseName',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
        return (
            <Input 
               style={{borderColor: '#CFCFCF' }} 
               autoFocus 
               placeholder='Enter Course Name' 
               value={selectedKeys[0]}
               onChange={(e) => {
                 setSelectedKeys(e.target.value ? [e.target.value] : []);
                 confirm({closeDropdown: false})
                }
               }
               onPressEnter={() => {confirm()}} 
               onBlur={() => {confirm()}}>
            </Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    
    },
    {
      title: 'Credits',
      dataIndex: 'credits',
      key: 'credits',
     
    },
    {
      title: 'Instructor',
      dataIndex: 'faculty',
      key: 'instructor',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
        return (
            <Input 
               style={{borderColor: '#CFCFCF' }} 
               autoFocus 
               placeholder='Enter Instructor ID' 
               value={selectedKeys[0]}
               onChange={(e) => {
                 setSelectedKeys(e.target.value ? [e.target.value] : []);
                 confirm({closeDropdown: false})
                }
               }
               onPressEnter={() => {confirm()}} 
               onBlur={() => {confirm()}}>
            </Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.faculty.toLowerCase().includes(value.toLowerCase());
      },
    },
  ];

  export const userColumns = [
    {
      title: 'User ID',
      dataIndex: 'Id',
      key: 'userId',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
        return (
            <Input 
               style={{borderColor: '#CFCFCF' }} 
               autoFocus 
               placeholder='Enter User ID' 
               value={selectedKeys[0]}
               onChange={(e) => {
                 setSelectedKeys(e.target.value ? [e.target.value] : []);
                 confirm({closeDropdown: false})
                }
               }
               onPressEnter={() => {confirm()}} 
               onBlur={() => {confirm()}}>
            </Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.Id.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
        return (
            <Input 
               style={{borderColor: '#CFCFCF' }} 
               autoFocus 
               placeholder='Enter Email' 
               value={selectedKeys[0]}
               onChange={(e) => {
                 setSelectedKeys(e.target.value ? [e.target.value] : []);
                 confirm({closeDropdown: false})
                }
               }
               onPressEnter={() => {confirm()}} 
               onBlur={() => {confirm()}}>
            </Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.email.toLowerCase().includes(value.toLowerCase());
      },
      
    }
];

export const roomColumns = [
  {
      title: 'Room Code',
      dataIndex: 'code',
      key: 'code',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
        return (
            <Input 
               style={{borderColor: '#CFCFCF' }} 
               autoFocus 
               placeholder='Enter Room Id' 
               value={selectedKeys[0]}
               onChange={(e) => {
                 setSelectedKeys(e.target.value ? [e.target.value] : []);
                 confirm({closeDropdown: false})
                }
               }
               onPressEnter={() => {confirm()}} 
               onBlur={() => {confirm()}}>
            </Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.code.toLowerCase().includes(value.toLowerCase());
      },
      
  },
  {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
        return (
            <Input 
               style={{borderColor: '#CFCFCF' }} 
               autoFocus 
               placeholder='Enter Location' 
               value={selectedKeys[0]}
               onChange={(e) => {
                 setSelectedKeys(e.target.value ? [e.target.value] : []);
                 confirm({closeDropdown: false})
                }
               }
               onPressEnter={() => {confirm()}} 
               onBlur={() => {confirm()}}>
            </Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.location.toLowerCase().includes(value.toLowerCase());
      },
      
  },
  {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
  },
  {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
  },
];

export const resourceColumns = [
  {
      title: 'Resource Code',
      dataIndex: 'code',
      key: 'code',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
        return (
            <Input 
               style={{borderColor: '#CFCFCF' }} 
               autoFocus 
               placeholder='Enter Resource Id' 
               value={selectedKeys[0]}
               onChange={(e) => {
                 setSelectedKeys(e.target.value ? [e.target.value] : []);
                 confirm({closeDropdown: false})
                }
               }
               onPressEnter={() => {confirm()}} 
               onBlur={() => {confirm()}}>
            </Input>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.code.toLowerCase().includes(value.toLowerCase());
      },
      

  },
  {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
  },
];

export const bookingColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date) => new Date(date).toLocaleDateString(),
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
      return (
          <Input 
             style={{borderColor: '#CFCFCF' }} 
             autoFocus 
             placeholder='Enter Date' 
             value={selectedKeys[0]}
             onChange={(e) => {
               setSelectedKeys(e.target.value ? [e.target.value] : []);
               confirm({closeDropdown: false})
              }
             }
             onPressEnter={() => {confirm()}} 
             onBlur={() => {confirm()}}>
          </Input>
      )
    },
    filterIcon: () => {
      return <SearchOutlined />
    },
    onFilter: (value, record) => {
      return record.date.toLowerCase().includes(value.toLowerCase());
    },
    
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
    key: 'endTime',
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
      return (
          <Input 
             style={{borderColor: '#CFCFCF' }} 
             autoFocus 
             placeholder='Enter User Id' 
             value={selectedKeys[0]}
             onChange={(e) => {
               setSelectedKeys(e.target.value ? [e.target.value] : []);
               confirm({closeDropdown: false})
              }
             }
             onPressEnter={() => {confirm()}} 
             onBlur={() => {confirm()}}>
          </Input>
      )
    },
    filterIcon: () => {
      return <SearchOutlined />
    },
    onFilter: (value, record) => {
      return record.userId.toLowerCase().includes(value.toLowerCase());
    },
    
  },
  {
    title: 'Room ID',
    dataIndex: 'roomId',
    key: 'roomId',
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
      return (
          <Input 
             style={{borderColor: '#CFCFCF' }} 
             autoFocus 
             placeholder='Enter Room Id' 
             value={selectedKeys[0]}
             onChange={(e) => {
               setSelectedKeys(e.target.value ? [e.target.value] : []);
               confirm({closeDropdown: false})
              }
             }
             onPressEnter={() => {confirm()}} 
             onBlur={() => {confirm()}}>
          </Input>
      )
    },
    filterIcon: () => {
      return <SearchOutlined />
    },
    onFilter: (value, record) => {
      return record.roomId.toLowerCase().includes(value.toLowerCase());
    },
    
  },
  {
    title: 'Resource IDs',
    dataIndex: 'resourceIds',
    key: 'resourceIds',
    render: (resourceIds) => Array.isArray(resourceIds) ? resourceIds.join(', ') : '', // Assuming resourceIds is an array of strings
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

export const pendingBookingColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date) => new Date(date).toLocaleDateString(),
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
      return (
          <Input 
             style={{borderColor: '#CFCFCF' }} 
             autoFocus 
             placeholder='Enter Date' 
             value={selectedKeys[0]}
             onChange={(e) => {
               setSelectedKeys(e.target.value ? [e.target.value] : []);
               confirm({closeDropdown: false})
              }
             }
             onPressEnter={() => {confirm()}} 
             onBlur={() => {confirm()}}>
          </Input>
      )
    },
    filterIcon: () => {
      return <SearchOutlined />
    },
    onFilter: (value, record) => {
      return record.date.toLowerCase().includes(value.toLowerCase());
    },
    
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
    key: 'endTime',
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
      return (
          <Input 
             style={{borderColor: '#CFCFCF' }} 
             autoFocus 
             placeholder='Enter User Id' 
             value={selectedKeys[0]}
             onChange={(e) => {
               setSelectedKeys(e.target.value ? [e.target.value] : []);
               confirm({closeDropdown: false})
              }
             }
             onPressEnter={() => {confirm()}} 
             onBlur={() => {confirm()}}>
          </Input>
      )
    },
    filterIcon: () => {
      return <SearchOutlined />
    },
    onFilter: (value, record) => {
      return record.userId.toLowerCase().includes(value.toLowerCase());
    },
    
  },
  {
    title: 'Room ID',
    dataIndex: ['roomId', '_id'],
    key: 'roomId',
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFIlters }) => {
      return (
          <Input 
             style={{borderColor: '#CFCFCF' }} 
             autoFocus 
             placeholder='Enter Room Id' 
             value={selectedKeys[0]}
             onChange={(e) => {
               setSelectedKeys(e.target.value ? [e.target.value] : []);
               confirm({closeDropdown: false})
              }
             }
             onPressEnter={() => {confirm()}} 
             onBlur={() => {confirm()}}>
          </Input>
      )
    },
    filterIcon: () => {
      return <SearchOutlined />
    },
    onFilter: (value, record) => {
      return record.roomId._id.toLowerCase().includes(value.toLowerCase());
    },
    
  },
  {
    title: 'Resource IDs',
    dataIndex: 'resourceIds',
    key: 'resourceIds',
    render: (resourceIds) => Array.isArray(resourceIds) ? resourceIds.map(resource => resource._id).join(', ') : '', 
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

export const courseData = [
    {
      key: '1',
      courseId: 'CSCI101',
      courseName: 'Introduction to Computer Science',
      instructor: 'Dr. John Smith',
      enrollmentStatus: 'Enrolled',
    },
    {
      key: '2',
      courseId: 'MATH202',
      courseName: 'Advanced Calculus',
      instructor: 'Prof. Emily Johnson',
      enrollmentStatus: 'Enrolled',
    },
    {
      key: '3',
      courseId: 'PHYS303',
      courseName: 'Quantum Mechanics',
      instructor: 'Dr. Michael Brown',
      enrollmentStatus: 'Not Enrolled',
    },
    {
      key: '4',
      courseId: 'CHEM101',
      courseName: 'Organic Chemistry',
      instructor: 'Dr. Sarah Lee',
      enrollmentStatus: 'Enrolled',
    },
    {
      key: '5',
      courseId: 'HIST202',
      courseName: 'World History: Renaissance to Modern Times',
      instructor: 'Prof. James Miller',
      enrollmentStatus: 'Not Enrolled',
    },
    {
      key: '6',
      courseId: 'ENG301',
      courseName: 'Shakespearean Literature',
      instructor: 'Dr. Elizabeth Davis',
      enrollmentStatus: 'Enrolled',
    },
    {
      key: '7',
      courseId: 'ECON303',
      courseName: 'Macroeconomics',
      instructor: 'Prof. David Brown',
      enrollmentStatus: 'Not Enrolled',
    },
    {
      key: '8',
      courseId: 'ART101',
      courseName: 'Introduction to Art History',
      instructor: 'Dr. Emily Johnson',
      enrollmentStatus: 'Enrolled',
    },
    {
      key: '9',
      courseId: 'PHIL202',
      courseName: 'Ethics and Moral Philosophy',
      instructor: 'Prof. Michael Adams',
      enrollmentStatus: 'Not Enrolled',
    },
    {
      key: '10',
      courseId: 'BIO303',
      courseName: 'Cell Biology',
      instructor: 'Dr. Rebecca Taylor',
      enrollmentStatus: 'Enrolled',
    },
    {
      key: '11',
      courseId: 'MUS207',
      courseName: 'Music Theory',
      instructor: 'Prof. Daniel Smith',
      enrollmentStatus: 'Enrolled',
    },
    {
      key: '12',
      courseId: 'PSYC301',
      courseName: 'Introduction to Psychology',
      instructor: 'Dr. John Wilson',
      enrollmentStatus: 'Not Enrolled',
    },
    {
      key: '13',
      courseId: 'COMM305',
      courseName: 'Public Speaking',
      instructor: 'Prof. Laura Martinez',
      enrollmentStatus: 'Enrolled',
    },
    {
      key: '14',
      courseId: 'PHYS204',
      courseName: 'Introduction to Astrophysics',
      instructor: 'Dr. Christopher Brown',
      enrollmentStatus: 'Not Enrolled',
    },
    {
      key: '15',
      courseId: 'LANG108',
      courseName: 'Spanish Language and Culture',
      instructor: 'Prof. Maria Rodriguez',
      enrollmentStatus: 'Enrolled',
    },
    {
      key: '16',
      courseId: 'GEOL201',
      courseName: 'Geology: Earth Processes',
      instructor: 'Dr. Richard Thompson',
      enrollmentStatus: 'Not Enrolled',
    },
    {
      key: '17',
      courseId: 'BUS401',
      courseName: 'Business Strategy',
      instructor: 'Prof. Robert Johnson',
      enrollmentStatus: 'Enrolled',
    },
    // Add more dummy data as needed
  ];