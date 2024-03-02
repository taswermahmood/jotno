import { Button, Input, Text } from "@ui-kitten/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";

import { BORDER_RADIUS } from "@/constants";
import { Row } from "./Row";
import { theme } from "@/theme";
import { Column } from "./Column";
import { useMutation } from "react-query";
import { createJobPosts } from "@/services/user";
import { Loading } from "./Loading";


const maxChars = 512;

export const CreatePost = ({
  userId,
  onPost,
}: {
  userId: number
  onPost: () => void
}) => {
  const { t } = useTranslation();
  const [pickedJobType, setPickedJobType] = useState<string>("petCare");
  const [pickedFrequency, setPickedFrequency] = useState<string>("monthly");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const onChange = (event: any, value: any) => {
    setDate(value);
    setShowDatePicker(false);
  };

  const createPost = useMutation(
    async (values: { title: string; description: string; wage: string; }) => {
      const jobPost = await createJobPosts(userId, pickedJobType, values.title, values.description, Number(values.wage), pickedFrequency, date.toLocaleDateString());
      if (jobPost) {
        alert("Job successfully posted.");
        onPost();
      }
    }
  );

  if (createPost.isLoading) return <Loading />
  return (
    <KeyboardAwareScrollView>
      <Formik
        initialValues={{
          title: "",
          description: "",
          wage: "",
          wageCurrency: "BDT",
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required("A title is required."),
          description: yup.string().required("Description is required."),
          wage: yup.string().required("Please enter the amount you want to pay for this job."),
        })}
        onSubmit={(values) => { createPost.mutate(values) }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldTouched,
        }) => {
          return (
            <>
              <Text category="label" appearance="hint" style={{ color: theme["color-primary-500"] }}>Select the type of jotno you need</Text>
              <Picker
                style={{ borderRadius: BORDER_RADIUS }}
                selectedValue={pickedJobType}
                onValueChange={(itemValue: string) =>
                  setPickedJobType(itemValue)
                }>
                <Picker.Item label="Pet Care" value="petCare" />
                <Picker.Item label="Elderly Care" value="elderlyCare" />
                <Picker.Item label="Baby Sitter" value="babySitter" />
                <Picker.Item label="House Keeping" value="houseKeeping" />
                <Picker.Item label="Teacher" value="teacher" />
              </Picker>
              <Input
                style={styles.input}
                value={values.title}
                onChangeText={handleChange("title")}
                placeholder="Title"
                label="Title"
                onBlur={() => setFieldTouched("title")}
                caption={
                  touched.title && errors.title ? errors.title : undefined
                }
                status={touched.title && errors.title ? "danger" : "basic"}
              />
              <Input
                multiline
                style={styles.input}
                value={values.description}
                textAlignVertical="top"
                onChangeText={handleChange("description")}
                placeholder="Describe the job"
                label="Description"
                onBlur={() => setFieldTouched("description")}
                caption={
                  touched.description && errors.description ? errors.description : undefined
                }
                status={touched.description && errors.description ? "danger" : "basic"}
              />
              <Text appearance={"hint"} category="c1">
                {maxChars - values.description.length} Characters Remaining
              </Text>
              <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
                <Input
                  style={[styles.input, { width: "85%" }]}
                  value={values.wage}
                  keyboardType="number-pad"
                  onChangeText={handleChange("wage")}
                  placeholder="Wage"
                  label="Wage"
                  onBlur={() => setFieldTouched("wage")}
                  caption={
                    touched.wage && errors.wage ? errors.wage : undefined
                  }
                  status={touched.wage && errors.wage ? "danger" : "basic"}
                />
                <Text style={{ marginHorizontal: 10, marginTop: 25 }}>{values.wageCurrency}</Text>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Column style={{ width: "50%" }}>
                  <Text category="label" appearance="hint" style={{ textAlign: "center", color: theme["color-primary-500"] }}>Recurence</Text>
                  <Picker
                    style={{ borderRadius: BORDER_RADIUS, borderWidth: 1 }}
                    selectedValue={pickedFrequency}
                    onValueChange={(itemValue: string) =>
                      setPickedFrequency(itemValue)
                    }>
                    <Picker.Item label="Monthly" value="monthly" />
                    <Picker.Item label="One Time" value="oneTime" />
                  </Picker>
                </Column>
                <Column style={{ width: "50%" }}>
                  <Text category="label" appearance="hint" style={{ textAlign: "center", color: theme["color-primary-500"] }}>Pick a date for your Job</Text>
                  <TouchableOpacity style={{ alignItems: "center", margin: 15 }} onPress={() => setShowDatePicker(true)}>
                    <Text>{date.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                </Column>
              </Row>
              {showDatePicker && (
                <DateTimePicker
                  minimumDate={new Date(Date.now())}
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChange}
                />
              )}
              <Button
                style={styles.signInButton}
                onPress={() => handleSubmit()}
              >
                {t("Create")}
              </Button>
            </>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    borderRadius: BORDER_RADIUS
  },
  signInButton: {
    marginTop: 20,
    borderRadius: BORDER_RADIUS
  }
});

