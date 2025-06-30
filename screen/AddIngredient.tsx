import '@/global.css';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { DatePickerModal } from "react-native-paper-dates";
import { Button, ButtonText } from "../src/components/ui/button";
import { FormControl } from "../src/components/ui/form-control";
import { Heading } from "../src/components/ui/heading";
import { ChevronDownIcon } from "../src/components/ui/icon";
import { Input, InputField } from "../src/components/ui/Input";

import { useIngredientContext } from '../context/IngredientContext';
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
  SelectTrigger,
} from "../src/components/ui/select";
import { Text } from "../src/components/ui/text";
import { VStack } from "../src/components/ui/vstack";



	
export default function Login() {
        const { addIngredient } = useIngredientContext();
        const [selectedDate, setSelectedDate] = useState<Date | null>(null);
        const [estimate, setEstimate] = useState<string | null>('');
        const [open, setOpen] = useState(false);
        const onDismissSingle = () => {setOpen(false);};
        const [ripeness, setRipeness] = useState<string>(''); // Current ripeness value
        const [ripenessUpdatedAt, setRipenessUpdatedAt] = useState<Date | null>(''); // When it was changed
        const navigation = useNavigation();

        const [ripenessOptions, setRipenessOptions] = useState([
             { label: 'Green', value: 'green' },
             { label: 'Ripe', value: 'ripe' },
             { label: 'Advanced', value: 'advanced' },
             { label: 'Too Ripe', value: 'too_ripe' },
]);
        const handleRipenessChange = (value: string) => {
         setRipeness(value);
         setRipenessUpdatedAt(new Date());
            };

        const onConfirmSingle = ({ date }: { date: Date }) => {
                                                                setSelectedDate(date); 
                                                                setEstimate('');     
                                                                setOpen(false);
                                                               };

        const handleEstimateChange = (value: string) => {
                                                            setEstimate(value);
                                                            setSelectedDate(null); 
                                                         };

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
          const [category, setCategory] = useState('');
          const [location, setLocation] = useState('');
          const [confection, setConfection] = useState('');
          const [name, setName] = useState('');
          const [brand, setBrand] = useState('');
          const handleSave = () => {
            addIngredient({
                            
                            name,
                            brand,
                            category,
                            location,
                            confection,
                            estimate,
                            selectedDate,
                            ripeness,
                            ripenessUpdatedAt

                            
                        });
           setCategory('');
           setLocation('');
           setConfection('');
           setName('');
           setBrand('');
           setSelectedDate(null);
           setEstimate('');
};
 const handleScan = () => {
    navigation.navigate('BarcodeScannerScreen', {
      onScanSuccess: (data: any) => {
        
        setName(data.name);
        setCategory(data.category);
        setLocation(data.location);
       
      },
    });
  };
          const handleReset = () => {
           setCategory('');
           setLocation('');
           setConfection('');
           setName('');
           setSelectedDate(null);
           setEstimate('');
          };
          return (
            <VStack className='items-center justify-center h-full'>
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
    <Select selectedValue={ripeness} onValueChange={handleRipenessChange}>
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

  </VStack>
)}
            
            <VStack>
                <Button
                    className=" w-[290px]"
                    onPress={() => setOpen(true)}
                    isDisabled={estimate !== '' }
                    >
                    <ButtonText className="text-typography-0">
                             {selectedDate ? selectedDate.toDateString() : "Select Date"}
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
            <Text className='text-center'>OR</Text>
            <VStack>
                <Select
                    isDisabled={selectedDate !== null}
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

            <VStack className="flex-row justify-center items-center space-x-4 ">
                <Button  onPress={handleReset}>
                    <ButtonText className="text-typography-0">Reset</ButtonText>
                </Button>
                <Button className="ml-auto" onPress={handleScan}>
                    <ButtonText className="text-typography-0">Scan</ButtonText>
                </Button>
                <Button className="ml-auto" onPress={handleSave}>
                    <ButtonText className="text-typography-0">Save</ButtonText>
                </Button>
            </VStack>
              </VStack>
              
            </FormControl>
            
            </VStack>
            

            
            

          );
        }


