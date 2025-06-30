import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { DatePickerModal } from "react-native-paper-dates";
import { OPEN_SHELF_LIFE_DAYS, useIngredientContext } from '../context/IngredientContext';
import { Input, InputField } from '../src/components/ui/Input';
import { Button, ButtonText } from '../src/components/ui/button';

import { ScrollView } from 'react-native';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel
} from "../src/components/ui/checkbox";
import { FormControl } from "../src/components/ui/form-control";
import { Heading } from "../src/components/ui/heading";
import { CheckIcon, ChevronDownIcon } from "../src/components/ui/icon";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger
} from "../src/components/ui/select";
import { Text } from '../src/components/ui/text';
import { VStack } from '../src/components/ui/vstack';
export default function EditIngredientScreen() {
  const { selectedIngredient, setSelectedIngredient, updateIngredient  } = useIngredientContext();
  const navigation = useNavigation();

  const [ripenessOptions, setRipenessOptions] = useState([
               { label: 'Green', value: 'green' },
               { label: 'Ripe', value: 'ripe' },
               { label: 'Advanced', value: 'advanced' },
  ]);

  const categories = ['Fruit', 'Vegetable', 'Dairy', 'Fish', 'Meat', 'Liquid'].map(item => ({
        label: item,
        value: item.toLowerCase(), 
        }));

  const locations = ['Fridge', 'Freezer', 'Pantry'].map(item => ({
        label: item,
        value: item.toLowerCase(),
        }));

  const confections = ['Fresh', 'Canned', 'Frozen', 'Cured'].map(item => ({
        label: item,
        value: item.toLowerCase(),
        }));
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [confection, setConfection] = useState('');
  const [estimate, setEstimate] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [ripeness, setRipeness] = useState<string>(''); // e.g., 'ripe', 'unripe', 'overripe', or whatever labels you use
  const [ripenessUpdatedAt, setRipenessUpdatedAt] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [isFrozenChecked, setIsFrozenChecked] = useState(false);
  const [originalDate, setOriginalDate] = useState<Date | null>(null);
  const [estimatedDate, setEstimatedDate] = useState<Date | null>();
const [isOpenedChecked, setIsOpenedChecked] = useState(false);
const [openedAt, setOpenedAt] = useState<Date | null>(null);





        const onDismissSingle = () => {setOpen(false);};
        const onConfirmSingle = ({ date }: { date: Date }) => {
                                                                setSelectedDate(date); 
                                                                setEstimate('');     
                                                                setOpen(false);
                                                               };

        const handleEstimateChange = (value: string) => {
                                                            setEstimate(value);
                                                            setSelectedDate(null); 
                                                         };
        const handleOpenedToggle = (checked: boolean) => {
  setIsOpenedChecked(checked);

  if (checked) {
    const now = new Date();
    setOpenedAt(now);

    const days =
      OPEN_SHELF_LIFE_DAYS[category] ?? OPEN_SHELF_LIFE_DAYS.default; // reuse constant
    const newDate = new Date(now);
    newDate.setDate(now.getDate() + days);

    // if newDate < previously selectedDate we shorten it
    if (!selectedDate || newDate < selectedDate) {
      setSelectedDate(newDate);
      setEstimate('');          // clear any “10 days” preset
    }
  } else {
    setOpenedAt(null);
    // optional: restore originalDate if it existed
    if (originalDate) setSelectedDate(originalDate);
  }
};







  useEffect(() => {
  if (selectedIngredient) {
    setName(selectedIngredient.name);
    setBrand(selectedIngredient.brand ?? '');
    setCategory(selectedIngredient.category);
    setLocation(selectedIngredient.location);
    setConfection(selectedIngredient.confection);
    setEstimate(selectedIngredient.estimate ?? '');
    setSelectedDate(selectedIngredient.selectedDate);
    setOriginalDate(selectedIngredient.selectedDate ?? null); 
    setRipeness(selectedIngredient.ripeness ?? '');
    setRipenessUpdatedAt(
      selectedIngredient.ripenessUpdatedAt ? new Date(selectedIngredient.ripenessUpdatedAt) : null
    );
    setIsFrozenChecked(selectedIngredient.isFrozen ?? false); 
     setIsOpenedChecked(selectedIngredient.isOpened ?? false);
    setOpenedAt(selectedIngredient.openedAt ? new Date(selectedIngredient.openedAt) : null);
  }
}, [selectedIngredient]);

  const handleSave = () => {
  if (!selectedIngredient) return;
  const updated = {
    ...selectedIngredient,
    name,
    brand,
    category,
    location,
    confection,
    selectedDate,
    ripeness,
    ripenessUpdatedAt,
    isFrozen: isFrozenChecked,
    estimate,
    isOpened: isOpenedChecked,
    openedAt

  };

  updateIngredient(updated);
  setSelectedIngredient(null);
  navigation.goBack()
  };

  if (!selectedIngredient) {
    return (
      <VStack className="p-4 items-center justify-center h-full">
        <Text>No ingredient selected.</Text>
      </VStack>
    );
  }

  return (
    <ScrollView>
<VStack className='items-center justify-center h-auto'>
              <FormControl className="p-5 border rounded-lg border-outline-300">
              <VStack space="xl">
                <Heading className="text-typography-900">Add Ingredient</Heading>
                <VStack space="xs">
                  <Text className="text-typography-500">Ingredient Name</Text>
                  <Input className="min-w-[250px]">
                    <InputField type="text" value={name} onChangeText={setName} />
                  </Input>
            </VStack>
             <VStack>
                          
                          <Input className="min-w-[250px]">
                                <InputField type="text" value={brand} onChangeText={setBrand} placeholder='Brand name' />
                              </Input>
                        </VStack>
            <VStack>
                <Select 
                    selectedValue={category} 
                    onValueChange={setCategory}>
                    <SelectTrigger>
                        <SelectInput placeholder="Select category" className="w-[240px]" value={category}  />
                            <SelectIcon as={ChevronDownIcon} className="mr-3" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {categories.map((category) => (
                            <SelectItem key={category.value} label={category.label} value={category.value}/>))}
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </VStack>
            <VStack>
                <Select
                    selectedValue={location} 
                    onValueChange={setLocation}
                >
                    <SelectTrigger>
                        <SelectInput placeholder="Select location" className="w-[240px]" value={location}/>
                            <SelectIcon as={ChevronDownIcon} className="mr-3" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {locations.map((location) => (
                            <SelectItem key={location.value} label={location.label} value={location.value}/>))}
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </VStack>
            <VStack>
                <Select
                    selectedValue={confection}
                    onValueChange={setConfection}
                >
                    <SelectTrigger>
                        <SelectInput placeholder="Select confection" className="w-[240px]" value={confection} />
                            <SelectIcon as={ChevronDownIcon} className="mr-3" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {confections.map((confection) => (
                            <SelectItem key={confection.value} label={confection.label} value={confection.value}/>))}
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </VStack>
             {confection === 'fresh' && (
              <VStack>
                <Select selectedValue={ripeness}
  onValueChange={(value) => {
    setRipeness(value);
    setRipenessUpdatedAt(new Date()); // Optional: update timestamp when changed
  }} >
                  <SelectTrigger>
                    <SelectInput placeholder="Select ripeness" className="w-[240px]" value={ripeness} />
                    <SelectIcon as={ChevronDownIcon} className="mr-3" />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {ripenessOptions.map((option) => (
                        <SelectItem key={option.value} label={option.label} value={option.value} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
            
                {ripenessUpdatedAt && (
                  <Text className="text-sm text-gray-400">
                    Updated: {ripenessUpdatedAt.toDateString()}
                  </Text>
                )}
              </VStack>
            )}
           {confection === 'fresh' &&  !estimate && (
  <VStack>
  <Checkbox
  value="frozen"
  isChecked={isFrozenChecked}
  onChange={(checked) => {
    // Prevent changing if already marked as frozen
    if (selectedIngredient?.isFrozen) return;

    setIsFrozenChecked(checked);

    // Case 1: Manual date exists
    if (checked && originalDate) {
      const extendedDate = new Date(originalDate);
      extendedDate.setMonth(extendedDate.getMonth() + 6);
      setSelectedDate(extendedDate);
    } else if (!checked && originalDate) {
      setSelectedDate(originalDate);
    }


  }}
  className="flex-row items-center space-x-2 mt-3"
>
  <CheckboxIndicator>
    <CheckboxIcon as={CheckIcon} />
  </CheckboxIndicator>
  <CheckboxLabel>
    Mark as Frozen (extends expiry by 6 months)
  </CheckboxLabel>
</Checkbox>

  </VStack>
)}
<Checkbox
  value="opened"
  isChecked={isOpenedChecked}
  onChange={handleOpenedToggle}
  className="flex-row items-center space-x-2 mt-3"
>
  <CheckboxIndicator>
    <CheckboxIcon as={CheckIcon} />
  </CheckboxIndicator>
  <CheckboxLabel>Opened (shortens expiry)</CheckboxLabel>
</Checkbox>
             

             <VStack>
                <Button
                    className="w-full"
                    onPress={() => setOpen(true)}
                    isDisabled={!!estimate}
                    >
                    <ButtonText className="text-typography-0">
                             {selectedDate ? new Date(selectedDate).toDateString() : "Select Date"}
                    </ButtonText>
                 </Button>
                <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={open}
                    date={selectedDate || new Date()}
                    onConfirm={onConfirmSingle}
                    onDismiss={onDismissSingle}
                    presentationStyle="pageSheet"
                />
                
            </VStack>
          
          
            <VStack>
                {estimatedDate && (
  <Text className="text-center text-sm text-gray-500 mt-2">
    Estimated Expiry Date: {estimatedDate.toDateString()}
  </Text>
)}
                <Select
                    isDisabled={!!selectedDate}
                    selectedValue={estimate || ""}
                    onValueChange={handleEstimateChange}
                    placeholder="Select Estimate"
                    >
                    <SelectTrigger variant="outline" size="md">
                        <SelectInput placeholder="Select Estimate" />
                    </SelectTrigger>
                
                    <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                    <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                                <SelectItem label="1 Week from now" value="7" />
                                <SelectItem label="10 Days from now" value="10" />
                                <SelectItem label="1 Month from now" value="30" />
                              </SelectContent>
                            </SelectPortal>
                          </Select>
            </VStack>


            <VStack className="flex-row justify-center items-center space-x-4 mt-4">
                
                <Button onPress={handleSave}>
        <ButtonText>Save Changes</ButtonText>
      </Button>
            </VStack>
              </VStack>
            </FormControl>
            </VStack>
</ScrollView>
   
  );
}
