import { Card, Row, Input, List, Avatar, Divider, Button } from 'antd';
import React, { useLayoutEffect } from 'react';
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

export const ChatList = (props) => {
  const [showMessaging, setshowMessaging] = useState(true);
  const [width, height] = useWindowSize();
  const username = props.match.params.id;

  const style = Object.assign({
    height: (height * 72) / 100,
    overflowY: 'auto',
    paddingRight: '-10px'
  });
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
            extra={<Button type='primary'>Start Chat</Button>}>
            <Row style={{ marginBottom: '6px' }}>
              <Input placeholder='Search Messages' />
            </Row>
            <List
              itemLayout='horizontal'
              id='search-result'
              dataSource={data}
              style={{
                height: (height * 80) / 100 - 125,
                overflowY: 'auto',
                paddingRight: '-10px'
              }}
              renderItem={(item) => {
                return (
                  <List.Item
                    style={{
                      cursor: 'pointer',
                      border: '1px solid rgba(0, 0, 0, .125)',
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
          </Card>
        ) : (
          <Card title='Messaging' bordered={true} style={{ width: 350, margin: 20 }}></Card>
        )}
      </div>
    </div>
  );
};
