import { Card, Row, Input, List, Avatar, Divider, Button, Col, Select } from 'antd';
import React, { useLayoutEffect } from 'react';
import { useState } from 'react';
import { Collapse } from 'antd';

// const data = [
//   {
//     title: 'Renegade San Francisco',
//     description:
//       'Renegade San Francisco returns with 275+ creatives for a springtime marketplace on August 29 + 30 at Fort Mason Center Festival Pavilion. Renegade Craft is free to attend & all are welcome.'
//   },
//   {
//     title: 'REIMAGINE 2020',
//     description:
//       'Get an exclusive inside look at the future of blockchain and crypto in our system. Join the Reimagine "Disrupt The System" Virtual Conference, a 72-hour live event bringing together industry leaders, universities, and enterprises innovating to solve real problems, now.'
//   },
//   {
//     title: 'COMEDY AT ZINQUE',
//     description:
//       'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
//   }
// ];

const data = [
  {
    title: 'Amit Gaikwad',
    userId: 'amit',
    messages: [
      'How are you',
      'Renegade San Francisco returns with 275+ creatives for a springtime marketplace on August 29 + 30 at Fort Mason Center Festival Pavilion. Renegade Craft is free to attend & all are welcome.'
    ]
  },
  {
    title: 'Mrunal Umate',
    messages: [
      'I am at Pune Center',
      'Get an exclusive inside look at the future of blockchain and crypto in our system. Join the Reimagine "Disrupt The System" Virtual Conference, a 72-hour live event bringing together industry leaders, universities, and enterprises innovating to solve real problems, now.'
    ],
    userId: 'mrunal'
  },
  {
    title: 'Ashok Patil',
    messages: [
      'Is there any alternative for JavaScript',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ],
    userId: 'ashok'
  },
  {
    title: 'Nilesh Mane',
    messages: [
      'Something is wrong there, can you please check that?',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ],
    userId: 'nilesh'
  },
  {
    title: 'Suyog Jagtap',
    messages: [
      'I am on the way, we can tech a look after I reach there',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ],
    userId: 'suyog'
  },
  {
    title: 'Amit Gaikwad',
    userId: 'amit',
    messages: [
      'How are you',
      'Renegade San Francisco returns with 275+ creatives for a springtime marketplace on August 29 + 30 at Fort Mason Center Festival Pavilion. Renegade Craft is free to attend & all are welcome.'
    ]
  },
  {
    title: 'Mrunal Umate',
    messages: [
      'I am at Pune Center',
      'Get an exclusive inside look at the future of blockchain and crypto in our system. Join the Reimagine "Disrupt The System" Virtual Conference, a 72-hour live event bringing together industry leaders, universities, and enterprises innovating to solve real problems, now.'
    ],
    userId: 'mrunal'
  },
  {
    title: 'Ashok Patil',
    messages: [
      'Is there any alternative for JavaScript',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ],
    userId: 'ashok'
  },
  {
    title: 'Nilesh Mane',
    messages: [
      'Something is wrong there, can you please check that?',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ],
    userId: 'nilesh'
  },
  {
    title: 'Suyog Jagtap',
    messages: [
      'I am on the way, we can tech a look after I reach there',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ],
    userId: 'suyog'
  }
];
const data2 = [
  {
    title: 'Amit Gaikwad',
    userId: 'amit',
    messages: [
      'How are you',
      'Renegade San Francisco returns with 275+ creatives for a springtime marketplace on August 29 + 30 at Fort Mason Center Festival Pavilion. Renegade Craft is free to attend & all are welcome.'
    ]
  },
  {
    title: 'Mrunal Umate',
    messages: [
      'I am at Pune Center',
      'Get an exclusive inside look at the future of blockchain and crypto in our system. Join the Reimagine "Disrupt The System" Virtual Conference, a 72-hour live event bringing together industry leaders, universities, and enterprises innovating to solve real problems, now.'
    ],
    userId: 'mrunal'
  },
  {
    title: 'Ashok Patil',
    messages: [
      'Is there any alternative for JavaScript',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ],
    userId: 'ashok'
  },
  {
    title: 'Nilesh Mane',
    messages: [
      'Something is wrong there, can you please check that?',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ],
    userId: 'nilesh'
  },
  {
    title: 'Suyog Jagtap',
    messages: [
      'I am on the way, we can tech a look after I reach there',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ],
    userId: 'suyog'
  }
];

const searchOptions = ['Message', 'User', 'Group'];

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
const { Panel } = Collapse;

export const ChatList = (props) => {
  const [selectedTypeSearch, setselectedTypeSearch] = useState(searchOptions[0]);
  const [showMessaging, setshowMessaging] = useState(true);
  const [showHistoryForUserIds, setshowHistoryForUserIds] = useState([]);
  const [width, height] = useWindowSize();
  const username = props.match.params.id;

  const style = Object.assign({
    height: (height * 72) / 100,
    overflowY: 'auto',
    paddingRight: '-10px'
  });

  const handleChange = (value) => {
    setselectedTypeSearch(value);
    // props.fetchUsersBySearchString({
    //   userId: props.userId,
    //   categories: value,
    //   searchStr: searchString
    // });
  };

  const onShowHistoryClick = (item) => {
    console.log('item', item, showHistoryForUserIds, showHistoryForUserIds.includes(item.userId));
    // {
    //   title: 'Amit Gaikwad',
    //   userId: 'amit',
    //   messages: [
    //     'How are you',
    //     'Renegade San Francisco returns with 275+ creatives for a springtime marketplace on August 29 + 30 at Fort Mason Center Festival Pavilion. Renegade Craft is free to attend & all are welcome.'
    //   ]
    // }
    const index = showHistoryForUserIds.indexOf(item.userId);
    if (index != -1) {
      showHistoryForUserIds.splice(index, 1);
      const ids = [...showHistoryForUserIds];
      setshowHistoryForUserIds(ids);
    } else {
      showHistoryForUserIds.push(item.userId);
      const ids = [...showHistoryForUserIds];
      setshowHistoryForUserIds(ids);
    }
  };
  return (
    <div>
      <div style={{ position: 'fixed', bottom: '0', right: '0%' }}>
        {showMessaging ? (
          <Card
            title='Messaging'
            bordered={true}
            className='chatList'
            style={{
              width: (width * 26) / 100,
              height: (height * 80) / 100,
              margin: 20,
              borderRadius: '2px',
              boxShadow: '2px black'
            }}
            // extra={<Button type='primary'>Start Chat</Button>}
          >
            <Row style={{ marginBottom: '6px' }}>
              <Col span={17}>
                <Input placeholder={`Search ${selectedTypeSearch}`} />
              </Col>
              <Col span={6} offset={1}>
                <Select
                  style={{ width: '100%' }}
                  placeholder='Please select'
                  value={selectedTypeSearch}
                  onChange={handleChange}>
                  {searchOptions.map((op, i) => (
                    <Select.Option key={i.toString(36) + i} value={op}>
                      {op}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Collapse defaultActiveKey={['1']} accordion>
              <Panel header='Mentorlink Chat' key='0'></Panel>
              <Panel header='Personal Chat' key='1'>
                <List
                  itemLayout='horizontal'
                  id='search-result'
                  dataSource={data}
                  style={{
                    height: (height * 80) / 100 - 300,
                    overflowY: 'auto',
                    paddingRight: '-10px'
                  }}
                  renderItem={(item) => {
                    return (
                      <List.Item
                        style={{
                          cursor: 'pointer',
                          border: '3px solid rgba(0, 0, 0, .125)',
                          marginTop: '2px'
                        }}>
                        <Row style={{ width: '100%' }}>
                          <Col span={2}>
                            <Avatar
                              size={25}
                              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                            />
                          </Col>
                          <Col span={10}>
                            <a href={`/message/fromUserId/${username}/toUserId/${item.userId}`}>
                              {item.title}
                            </a>
                          </Col>
                          <Col span={6}>
                            {
                              <a onClick={() => onShowHistoryClick(item)}>
                                {!showHistoryForUserIds.includes(item.userId)
                                  ? `Show History`
                                  : `Hide History`}
                              </a>
                            }
                          </Col>
                          <Col span={6}>
                            <a href={`/message/fromUserId/${username}/toUserId/${item.userId}`}>
                              Start Chat
                            </a>
                          </Col>
                          {showHistoryForUserIds.includes(item.userId) && (
                            <Col span={24} style={{ padding: 10 }}>
                              {item.messages[0]}
                            </Col>
                          )}
                        </Row>
                      </List.Item>
                    );
                  }}
                />
              </Panel>
              <Panel header='Group Chat' key='2'>
                <List
                  itemLayout='horizontal'
                  id='search-result'
                  dataSource={data}
                  style={{
                    height: (height * 80) / 100 - 300,
                    overflowY: 'auto',
                    paddingRight: '-10px'
                  }}
                  renderItem={(item) => {
                    return (
                      <List.Item
                        style={{
                          cursor: 'pointer',
                          border: '2px solid black',
                          marginTop: '2px'
                        }}>
                        <List.Item.Meta
                          avatar={
                            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                          }
                          title={
                            <a href={`/message/fromUserId/${username}/toUserId/${item.userId}`}>
                              {item.title}
                            </a>
                          }
                          description={item.messages[0]}
                          //description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget bibendum elit. Fusce facilisis accumsan dui, efficitur commodo ante facilisis ut.'
                        />
                      </List.Item>
                    );
                  }}
                />
              </Panel>
            </Collapse>
          </Card>
        ) : (
          <Card title='Messaging' bordered={true} style={{ width: 350, margin: 20 }}></Card>
        )}
      </div>
    </div>
  );
};
