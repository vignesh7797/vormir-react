#!/usr/bin/env python3
import os
import re

stories_dir = '/Users/fi-user/Documents/vormir-react/apps/storybook/stories'

# Files that need fixing - remove args: {} from stories with render
files_to_fix = [
    'Toast.stories.tsx',
    'Menu.stories.tsx',
    'Card.stories.tsx',
    'Badge.stories.tsx',
    'Accordion.stories.tsx',
    'Table.stories.tsx',
    'Timeline.stories.tsx',
    'Stat.stories.tsx',
    'Tooltip.stories.tsx'
]

for filename in files_to_fix:
    filepath = os.path.join(stories_dir, filename)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Pattern to remove args: {} followed by render
    # Match: export const Name: Story = {\n  args: {},\n  render:
    # Replace with: export const Name: Story = {\n  render:
    pattern = r'(export const \w+: Story = \{)\n  args: \{\},\n(\s+render:)'
    replacement = r'\1\n\2'
    
    new_content = re.sub(pattern, replacement, content)
    
    # Also fix cases where component requires children but uses empty args
    # Remove standalone args: {} lines that are causing errors
    pattern2 = r'(export const \w+: Story = \{)\n  args: \{\},'
    replacement2 = r'\1'
    new_content = re.sub(pattern2, replacement2, new_content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed {filename}")
    else:
        print(f"No changes needed for {filename}")
