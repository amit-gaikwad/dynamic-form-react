import { Card, Row, Input, List, Avatar } from 'antd';
import React from 'react';
import { useState } from 'react';

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
    ]
  },
  {
    title: 'Ashok Patil',
    messages: [
      'Is there any alternative for JavaScript',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ]
  },
  {
    title: 'Nilesh Mane',
    messages: [
      'Something is wrong there, can you please check that?',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ]
  },
  {
    title: 'Suyog Jagtap',
    messages: [
      'I am on the way, we can tech a look after I reach there',
      'Comedy for the classy has a spot at Zinque in Downtown Los Angeles.New comics every Sunday at 830p. Produced by Mitchell Lamar.939 S Broadway.'
    ]
  }
];
export const ChatList = () => {
  const [showMessaging, setshowMessaging] = useState(true);
  return (
    <div>
      <div style={{ position: 'fixed', width: '20%' }}>
        {showMessaging ? (
          <Card
            title='Messaging'
            bordered={true}
            style={{
              width: 350,
              margin: 20,
              borderRadius: '2px',
              boxShadow: '2px black'
            }}>
            <Row>
              <Input placeholder='Search Messages' />
            </Row>
            <List
              itemLayout='horizontal'
              dataSource={data}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                      }
                      title={<a href='https://ant.design'>{item.title}</a>}
                      description={item.messages[0]}
                      //description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget bibendum elit. Fusce facilisis accumsan dui, efficitur commodo ante facilisis ut.'
                    />
                  </List.Item>
                );
              }}
            />
          </Card>
        ) : (
          <Card title='Messaging' bordered={true} style={{ width: 350, margin: 20 }}></Card>
        )}
      </div>
    </div>
  );
};
