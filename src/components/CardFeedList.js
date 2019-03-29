import React from 'react'
import { Card, Feed, Icon, Grid } from 'semantic-ui-react'
import moment from 'moment'
import 'moment/locale/es'
import { Link } from 'gatsby'

const CardFeedList = props => {
  moment.locale('es')
  return (
    <Card.Group stackable centered itemsPerRow={2}>
      {props.data.map((item, index) => (
        <Card fluid key={index}>
          <Card.Content>
            <Card.Header>
              Sesión {index + 1} - {moment(item.date).format('LL')}
            </Card.Header>
            <Card.Meta>{moment(item.date).fromNow()}</Card.Meta>
          </Card.Content>
          <Card.Content>
            <Feed size="large">
              {props.feedContent.map((itemHeader, headerIndex) => (
                <Feed.Event key={headerIndex}>
                  <Feed.Label>
                    <Icon circular name={itemHeader.icon} />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary
                      content={itemHeader.header}
                      date={itemHeader.suggestedTime}
                    />

                    <Feed.Extra text>
                      {itemHeader.isArray ? (
                        item[itemHeader.accessor].map(x => x)
                      ) : itemHeader.isLink ? (
                        <Link to={item[`${itemHeader.accessor}Link`]}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item[itemHeader.accessor],
                            }}
                          />
                        </Link>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item[itemHeader.accessor],
                          }}
                        />
                      )}
                    </Feed.Extra>
                  </Feed.Content>
                </Feed.Event>
              ))}
            </Feed>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}

export default CardFeedList
