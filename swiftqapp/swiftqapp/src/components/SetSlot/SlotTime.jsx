import Moment from "moment/moment";
import { Form, Checkbox } from "antd";

export default function SlotTime(props) {
  const { timeDuration, maxNoOfUsersPerSlot } = props;
  // const scslotId = 1;
  console.log("timeDuration " + timeDuration);

  const start = Moment("10:00:00", "HH:mm:ss");

  const end = Moment("17:59:59", "HH:mm:ss");
  const timeSeries = [];

  while (start.isSameOrBefore(end)) {
    let startTime = start.format("HH:mm");
    let endTime = start.add(timeDuration, "m").format("HH:mm");

    startTime = startTime.replace(":", "");
    endTime = endTime.replace(":", "");
    startTime = parseFloat(startTime);
    endTime = parseFloat(endTime);

    timeSeries.push({
      slotStartTime: startTime,
      slotEndTime: endTime,
      maxNoOfUsersPerSlot: maxNoOfUsersPerSlot,
    });
  }

  console.log(timeSeries);
  return (
    <div>
      <label className="form-label fontSize">
        Select time slots which will be available for booking:
      </label>
      <br />
      <hr />

      <div className="row mt-4 fontSize">
        <div className="col">
          <div class="form-check form-check-inline">
            <Form.Item
              name="timeSlot"
              rules={[
                {
                  required: true,
                  message: "Please Select Time Slots",
                },
              ]}
            >
              <Checkbox.Group>
                <div className="row">
                  {timeSeries.map((item) => {
                    let { slotStartTime, slotEndTime } = item;
                    slotStartTime = slotStartTime.toString();
                    slotEndTime = slotEndTime.toString();
                    slotStartTime =
                      slotStartTime.slice(0, 2) + ":" + slotStartTime.slice(2);
                    slotEndTime =
                      slotEndTime.slice(0, 2) + ":" + slotEndTime.slice(2);
                    return (
                      <div className="col-md-3 mt-3">
                        <Checkbox value={item}>
                          {slotStartTime} to {slotEndTime}
                        </Checkbox>
                      </div>
                    );
                  })}
                </div>
              </Checkbox.Group>
            </Form.Item>
          </div>
        </div>
      </div>
    </div>
  );
}
