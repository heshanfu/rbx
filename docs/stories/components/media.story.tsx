import { faHeart, faReply, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Level, Media } from "src/components";
import {
  Button,
  Checkbox,
  Content,
  Control,
  Delete,
  Field,
  Icon,
  Image,
  Label,
  Textarea,
} from "src/elements";
import { Section } from "src/layout";

storiesOf("Components/Media", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => (
    <Media>
      <Media.Item as="figure" align="left">
        <Image.Container as="p" size={64}>
          <Image
            alt="64x64"
            src="https://bulma.io/images/placeholders/128x128.png"
          />
        </Image.Container>
      </Media.Item>
      <Media.Item align="content">
        <Content>
          <p>
            <strong>John Smith</strong> <small>@johnsmith</small>{" "}
            <small>31m</small>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
            non massa sem. Etiam finibus odio quis feugiat facilisis.
          </p>
        </Content>
        <Level breakpoint="mobile">
          <Level.Item align="left">
            <Level.Item as="a">
              <Icon size="small">
                <FontAwesomeIcon icon={faReply} />
              </Icon>
            </Level.Item>
            <Level.Item as="a">
              <Icon size="small">
                <FontAwesomeIcon icon={faRetweet} />
              </Icon>
            </Level.Item>
            <Level.Item as="a">
              <Icon size="small">
                <FontAwesomeIcon icon={faHeart} />
              </Icon>
            </Level.Item>
          </Level.Item>
        </Level>
      </Media.Item>
      <Media.Item align="right">
        <Delete />
      </Media.Item>
    </Media>
  ))
  .add("Input", () => (
    <Media>
      <Media.Item as="figure" align="left">
        <Image.Container as="p" size={64}>
          <Image src="https://bulma.io/images/placeholders/128x128.png" />
        </Image.Container>
      </Media.Item>
      <Media.Item align="content">
        <Field>
          <Control>
            <Textarea placeholder="Add a comment..." />
          </Control>
        </Field>
        <Level>
          <Level.Item align="left">
            <Level.Item>
              <Button color="info" type="submit">
                Submit
              </Button>
            </Level.Item>
          </Level.Item>
          <Level.Item align="right">
            <Level.Item>
              <Label>
                <Checkbox /> Press enter to submit
              </Label>
            </Level.Item>
          </Level.Item>
        </Level>
      </Media.Item>
    </Media>
  ))
  // tslint:disable-next-line: max-func-body-length
  .add("Nesting", () => (
    <React.Fragment>
      <Media as="article">
        <Media.Item align="left">
          <Image.Container as="p" size={64}>
            <Image src="https://bulma.io/images/placeholders/128x128.png" />
          </Image.Container>
        </Media.Item>
        <Media.Item align="content">
          <Content>
            <p>
              <strong>Barbara Middleton</strong>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              porta eros lacus, nec ultricies elit blandit non. Suspendisse
              pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus
              turpis.
              <br />
              <small>
                <a href="#like">Like</a> · <a href="#reply">Reply</a> · 3 hrs
              </small>
            </p>
          </Content>

          <Media>
            <Media.Item align="left">
              <Image.Container as="p" size={48}>
                <Image src="https://bulma.io/images/placeholders/128x128.png" />
              </Image.Container>
            </Media.Item>
            <Media.Item align="content">
              <Content>
                <p>
                  <strong>Sean Brown</strong>
                  <br />
                  Donec sollicitudin urna eget eros malesuada sagittis.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Aliquam blandit nisl a
                  nulla sagittis, a lobortis leo feugiat.
                  <br />
                  <small>
                    <a href="#like">Like</a> · <a href="#reply">Reply</a> · 2
                    hrs
                  </small>
                </p>
              </Content>

              <Media>
                Vivamus quis semper metus, non tincidunt dolor. Vivamus in mi eu
                lorem cursus ullamcorper sit amet nec massa.
              </Media>

              <Media>
                Morbi vitae diam et purus tincidunt porttitor vel vitae augue.
                Praesent malesuada metus sed pharetra euismod. Cras tellus odio,
                tincidunt iaculis diam non, porta aliquet tortor.
              </Media>
            </Media.Item>
          </Media>

          <Media>
            <Media.Item align="left">
              <Image.Container as="p" size={48}>
                <Image src="https://bulma.io/images/placeholders/96x96.png" />
              </Image.Container>
            </Media.Item>
            <Media.Item align="content">
              <Content>
                <p>
                  <strong>Kayli Eunice </strong>
                  <br />
                  Sed convallis scelerisque mauris, non pulvinar nunc mattis
                  vel. Maecenas varius felis sit amet magna vestibulum euismod
                  malesuada cursus libero. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia Curae;
                  Phasellus lacinia non nisl id feugiat.
                  <br />
                  <small>
                    <a href="#like">Like</a> · <a href="#reply">Reply</a> · 2
                    hrs
                  </small>
                </p>
              </Content>
            </Media.Item>
          </Media>
        </Media.Item>
      </Media>
      <Media as="article">
        <Media.Item align="left">
          <Image.Container as="p" size={64}>
            <Image src="https://bulma.io/images/placeholders/128x128.png" />
          </Image.Container>
        </Media.Item>
        <Media.Item align="content">
          <Field>
            <Control as="p">
              <Textarea placeholder="Add a comment..." />
            </Control>
          </Field>
          <Field>
            <Control as="p">
              <Button>Post comment</Button>
            </Control>
          </Field>
        </Media.Item>
      </Media>
    </React.Fragment>
  ));
