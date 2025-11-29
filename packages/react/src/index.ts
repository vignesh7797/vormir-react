// Global Styles
import './styles/globals.css';

// Primitives
export { Box } from './components/Box';
export { Button } from './components/Button';
export { Input } from './components/Input';
export { Label } from './components/Label';
export { Text } from './components/Text';
export { Slot } from './components/Slot';

// Form Components (Phase 2)
export { Checkbox } from './components/Checkbox';
export { RadioGroup, RadioGroupItem } from './components/Radio';
export { Switch } from './components/Switch';
export { Textarea } from './components/Textarea';
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/Select';

// Form Helpers
export { FormControl, useFormControl } from './components/FormControl';
export { FormErrorMessage } from './components/FormErrorMessage';
export { FormHelperText } from './components/FormHelperText';

// Feedback Components (Phase 3)
export { Alert, AlertTitle, AlertDescription } from './components/Alert';
export { ToastProvider, useToast, toast } from './components/Toast';
export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from './components/Modal';
export { Tooltip } from './components/Tooltip';
export { Progress, CircularProgress } from './components/Progress';
export { Skeleton } from './components/Skeleton';

// Navigation Components (Phase 4)
export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  MenuGroup,
  MenuSub,
} from './components/Menu';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';
export {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from './components/Breadcrumbs';
export { Pagination, PaginationInfo, PaginationSizeSelector } from './components/Pagination';
export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  SidebarToggle,
  SidebarCollapse,
} from './components/Sidebar';
export {
  CommandPalette,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandEmpty,
  CommandLoading,
  useCommandPalette,
} from './components/CommandPalette';

// Data Display Components (Phase 5)
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage } from './components/Card';
export { Badge, BadgeGroup } from './components/Badge';
export { Avatar, AvatarGroup } from './components/Avatar';
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/Accordion';
export { List, ListItem } from './components/List';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './components/Table';
export { Timeline, TimelineItem } from './components/Timeline';
export { Stat, StatGroup } from './components/Stat';
export { Code } from './components/Code';
export { Kbd } from './components/Kbd';

// Advanced Input & Media Components (Phase 6)
export { Slider } from './components/Slider';
export { Drawer } from './components/Drawer';
export { Popover } from './components/Popover';
export { ContextMenu } from './components/ContextMenu';
export { Combobox } from './components/Combobox';
export { MultiSelect } from './components/MultiSelect';
export { DatePicker } from './components/DatePicker';
export { ColorPicker } from './components/ColorPicker';

// Layout
export { Container } from './components/Container';
export { Flex } from './components/Flex';
export { Grid } from './components/Grid';
export { Stack } from './components/Stack';

// Theme
export { ThemeProvider, useTheme } from './theme';
export * from './utils/theme';

// Types - Primitives
export type { BoxProps } from './components/Box';
export type { ButtonProps } from './components/Button';
export type { InputProps } from './components/Input';
export type { LabelProps } from './components/Label';
export type { TextProps } from './components/Text';

// Types - Form Components
export type { CheckboxProps } from './components/Checkbox';
export type { RadioGroupProps, RadioGroupItemProps } from './components/Radio';
export type { SwitchProps } from './components/Switch';
export type { TextareaProps } from './components/Textarea';
export type { SelectTriggerProps } from './components/Select';

// Types - Form Helpers
export type { FormControlProps } from './components/FormControl';
export type { FormErrorMessageProps } from './components/FormErrorMessage';
export type { FormHelperTextProps } from './components/FormHelperText';

// Types - Feedback Components (Phase 3)
export type { AlertProps, AlertTitleProps, AlertDescriptionProps } from './components/Alert';
export type { Toast, ToastVariant, ToastPosition, ToastProviderProps } from './components/Toast';
export type {
  ModalProps,
  ModalHeaderProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalFooterProps,
} from './components/Modal';
export type { TooltipProps } from './components/Tooltip';
export type { ProgressProps, CircularProgressProps } from './components/Progress';
export type { SkeletonProps } from './components/Skeleton';

// Types - Navigation Components (Phase 4)
export type {
  MenuProps,
  MenuTriggerProps,
  MenuContentProps,
  MenuItemProps,
  MenuSeparatorProps,
  MenuLabelProps,
  MenuGroupProps,
  MenuSubProps,
} from './components/Menu';
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './components/Tabs';
export type {
  BreadcrumbsProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbSeparatorProps,
  BreadcrumbPageProps,
} from './components/Breadcrumbs';
export type {
  PaginationProps,
  PaginationInfoProps,
  PaginationSizeSelectorProps,
} from './components/Pagination';
export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarFooterProps,
  SidebarNavProps,
  SidebarNavItemProps,
  SidebarToggleProps,
  SidebarCollapseProps,
} from './components/Sidebar';
export type {
  CommandPaletteProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandEmptyProps,
  CommandLoadingProps,
} from './components/CommandPalette';

// Types - Data Display Components (Phase 5)
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardImageProps,
} from './components/Card';
export type { BadgeProps, BadgeGroupProps } from './components/Badge';
export type { AvatarProps, AvatarGroupProps } from './components/Avatar';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './components/Accordion';
export type { ListProps, ListItemProps } from './components/List';
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from './components/Table';
export type { TimelineProps, TimelineItemProps } from './components/Timeline';
export type { StatProps, StatGroupProps } from './components/Stat';
export type { CodeProps } from './components/Code';
export type { KbdProps } from './components/Kbd';

// Types - Advanced Input & Media Components (Phase 6)
export type { SliderProps } from './components/Slider';
export type { DrawerProps } from './components/Drawer';
export type { PopoverProps } from './components/Popover';
export type { ContextMenuProps, ContextMenuItem } from './components/ContextMenu';
export type { ComboboxProps, ComboboxOption } from './components/Combobox';
export type { MultiSelectProps, MultiSelectOption } from './components/MultiSelect';
export type { DatePickerProps } from './components/DatePicker';
export type { ColorPickerProps } from './components/ColorPicker';

// Types - Layout
export type { ContainerProps } from './components/Container';
export type { FlexProps } from './components/Flex';
export type { GridProps } from './components/Grid';
export type { StackProps } from './components/Stack';

// Types - Theme
export type { ThemeProviderProps, Theme } from './theme';
