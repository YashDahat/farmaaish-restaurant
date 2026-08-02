package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.EventDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/active")
    public ResponseEntity<List<EventDto>> getAllActiveEvents() {
        List<EventDto> activeEvents = eventService.getActiveEvents();
        return new ResponseEntity<>(activeEvents, HttpStatus.OK);
    }

    @GetMapping("/type/{eventType}")
    public ResponseEntity<List<EventDto>> getEventsByType(@PathVariable String eventType) {
        List<EventDto> events = eventService.getEventsByType(eventType);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable UUID id) {
        try {
            EventDto event = eventService.getEventById(id);
            return new ResponseEntity<>(event, HttpStatus.OK);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}