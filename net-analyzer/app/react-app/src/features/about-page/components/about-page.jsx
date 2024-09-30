import React from 'react';
import { Container, Title, Text, Divider, Anchor, Stack, Space } from '@mantine/core';
import aboutContent from '../assets/sections.json';

export const AboutPage = () => {
  const { title, intro, sections, contact } = aboutContent;

  return (
    <Container size="md" my="xl">
      {/* Title */}
      <Title order={1} align="left" mb="md">
        {title}
      </Title>

      {/* Intro Paragraph with Markdown */}
      <Text size="md"  align="left" mb="lg">{intro}</Text>
      <Divider></Divider><Space h="xl"></Space>
      {/* Sections */}
      <Stack spacing="">
        {sections.map((section, index) => (
          <div key={index}>
            <Title order={2}  align="left" mb="sm">
              {section.heading}
            </Title>
            <Text size="md" align="justify">{section.content}</Text>
          </div>
        ))}
      </Stack>
    </Container>
  );
};