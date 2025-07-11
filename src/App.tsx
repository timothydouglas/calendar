import { Guard } from 'react-guardian';
import {
  CalendarHeader,
  Dates,
  Sidebar,
  MiniCalendar,
  CreateButton,
  Filter,
  ClearFilter,
  Toast
} from './components';
import {
  useAuthActions,
  useGetCreateActions,
  useGetDates,
  useGetEvents,
  useInitReference,
  useLocations,
  useSections,
  useToast
} from './hooks';
import {
  UseGetDatesHook,
  UseGetCreateActionsHook,
  UseAuthActionsHook,
  UseGetEventsHook,
  SelectOption,
  UseToastHook
} from './models';

function App(): JSX.Element {
  const { REACT_APP_SITE_TITLE }: NodeJS.ProcessEnv = process.env;
  const { signOut, exclusionPolicy, eventPolicy, user }: UseAuthActionsHook = useAuthActions();
  useInitReference();
  const { addToast, toasts, toastType }: UseToastHook = useToast();
  const { createAvailableEvent, createUnavailableEvent, updateUnavailableEvent, deleteUnavailableEvent, deleteAvailableEvent }: UseGetCreateActionsHook = useGetCreateActions(addToast);
  const { date, dateType, setDateType, selectedDate, gotoPrevDate, gotoNextDate, gotoCurrentDate, setDate, setSelectedDate }: UseGetDatesHook = useGetDates();
  const { events, availableFilters, filters, locations, selectedEvent, setFilters, setSelectedEvent, workUnits }: UseGetEventsHook = useGetEvents(selectedDate, dateType.id);
  const currentLocations: SelectOption[] = useLocations(locations, filters.workUnitId, filters, setFilters);
  const sections: SelectOption[] = useSections(locations, filters.locationId, filters, setFilters);

  return (
    <>
      <div className="h-screen flex flex-col">
        <CalendarHeader
          title={REACT_APP_SITE_TITLE}
          date={selectedDate}
          dateType={dateType}
          setDateType={setDateType}
          gotoPrevDate={gotoPrevDate}
          gotoNextDate={gotoNextDate}
          gotoCurrentDate={gotoCurrentDate}
          logOut={signOut}
          user={user}
        />
        <div className="flex flex-1">
          <Sidebar>
            <Guard policies={[eventPolicy.create, exclusionPolicy.create]}>
              <CreateButton
                addUnavailableEvent={createUnavailableEvent}
                addAvailableEvent={createAvailableEvent}
                deleteUnavailableEvent={deleteUnavailableEvent}
                deleteAvailableEvent={deleteAvailableEvent}
                selectedDate={selectedDate}
                locations={locations}
                workUnits={workUnits}
              />
            </Guard>

            <MiniCalendar selectedDate={selectedDate} setSelectedDate={setDate} />

            <ClearFilter
              availableFilters={availableFilters}
              clearFilter={setFilters}
              currentFilters={filters}
            />

            <Filter
              currentFilters={filters}
              filters={availableFilters.workUnitId}
              id="workUnitId"
              options={workUnits}
              setFilter={setFilters}
              title="Work Units"
            />
            <Filter
              currentFilters={filters}
              filters={availableFilters.locationId}
              id="locationId"
              options={currentLocations}
              setFilter={setFilters}
              title="Locations"
            />
            <Filter
              currentFilters={filters}
              id="sectionId"
              options={sections}
              setFilter={setFilters}
              title="Sections"
            />
          </Sidebar>
          <Dates
            addAvailableEvent={createAvailableEvent}
            addToast={addToast}
            dateType={dateType.id}
            deleteUnavailableEvent={deleteUnavailableEvent}
            deleteAvailableEvent={deleteAvailableEvent}
            updateUnavailableEvent={updateUnavailableEvent}
            date={date}
            selectedDate={selectedDate}
            events={events}
            guards={{eventPolicy, exclusionPolicy}}
            locations={locations}
            selectedEvent={selectedEvent}
            setSelectedDate={setSelectedDate}
            setSelectedEvent={setSelectedEvent}
            workUnits={workUnits}
          />
        </div>
      </div>
      <Toast toast={toasts} type={toastType} />
    </>
  );
}

export default App
